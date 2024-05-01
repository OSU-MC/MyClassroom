const mysql = require('mysql2/promise');
require('dotenv').config({ override: false });
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getPassword() {
    return new Promise((resolve) => {
        const stdin = process.openStdin();
        let password = '';

        process.stdin.on('data', function (char) {
            char = char + '';
            switch (char) {
                case '\n':
                case '\r':
                case '\u0004':
                    process.stdin.pause();
                    break;
                default:
                    password += char;
                    process.stdout.write('\x1B[2K\x1B[200D' + 'Enter mysql admin password: ' + '*'.repeat(password.length));
                    break;
            }
        });

        rl.question('Enter mysql admin password: ', () => {
            resolve(password);
        });
    });
}

async function setupDatabase(dbConfig) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host || 'localhost',
            port: dbConfig.port || 3306,
            user: dbConfig.user || 'root',
            password: dbConfig.password
        });

        console.log(`Connected to MySQL Server at ${dbConfig.host}`);

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.dbName}`);
        console.log(`Database '${dbConfig.dbName}' created or already exists`);

        await connection.query(`CREATE USER IF NOT EXISTS '${dbConfig.dbUser}'@'%' IDENTIFIED BY '${dbConfig.dbPass}'`);
        console.log(`User '${dbConfig.dbUser}' created or already exists`);

        await connection.query(`GRANT ALL PRIVILEGES ON ${dbConfig.dbName}.* TO '${dbConfig.dbUser}'@'%'`);
        console.log(`Granted all privileges to '${dbConfig.dbUser}' on '${dbConfig.dbName}'`);

        await connection.end();
        console.log("MySQL connection closed");
    } catch (err) {
        console.error(`Failed to setup ${dbConfig.type} database:`, err);
        process.exit(1);
    }
}

async function main() {
    let adminPassword = process.env.ADMIN_PASS;
    if (!adminPassword)
        adminPassword = await getPassword();

    const dbConfigs = [
        {
            type: 'Production',
            dbName: process.env.PROD_DB_NAME,
            dbUser: process.env.PROD_DB_USER,
            dbPass: process.env.PROD_DB_PASS,
            host: process.env.PROD_DB_HOST,
            port: process.env.PROD_DB_PORT,
            user: process.env.ADMIN_USER,
            password: adminPassword
        },
        {
            type: 'Development',
            dbName: process.env.DEV_DB_NAME,
            dbUser: process.env.DEV_DB_USER,
            dbPass: process.env.DEV_DB_PASS,
            host: process.env.DEV_DB_HOST,
            port: process.env.DEV_DB_PORT,
            user: process.env.ADMIN_USER,
            password: adminPassword
        },
        {
            type: 'Test',
            dbName: process.env.TEST_DB_NAME,
            dbUser: process.env.TEST_DB_USER,
            dbPass: process.env.TEST_DB_PASS,
            host: process.env.TEST_DB_HOST,
            port: process.env.TEST_DB_PORT,
            user: process.env.ADMIN_USER,
            password: adminPassword
        }
    ];

    for (const dbConfig of dbConfigs)
        await setupDatabase(dbConfig);

    rl.close();
}

main();
