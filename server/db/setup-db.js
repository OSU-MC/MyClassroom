const mysql = require('mysql2/promise');
require('dotenv').config({ override: false});
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
                    process.stdout.write('\x1B[2K\x1B[200D' + 'Enter admin password: ' + '*'.repeat(password.length));
                    break;
            }
        });

        rl.question('Enter admin password: ', () => {
            resolve(password);
        });
    });
}

async function setupDatabase() {
    try {
        let adminPassword = process.env.ADMIN_PASS;
        if (!adminPassword)
            adminPassword = await getPassword();

        const connection = await mysql.createConnection({
            host: process.env.PROD_DB_HOST || 'localhost',
            port: process.env.PROD_DB_PORT || 3306,
            user: process.env.ADMIN_USER || 'root',
            password: adminPassword
        });

        console.log('Connected to MySQL Server!');

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.PROD_DB_NAME}`);
        console.log("Database created or already exists");

        await connection.query(`CREATE USER IF NOT EXISTS '${process.env.PROD_DB_USER}'@'${process.env.PROD_DB_HOST}' IDENTIFIED BY '${process.env.PROD_DB_PASS}'`);
        console.log("User created or already exists");

        await connection.query(`GRANT ALL PRIVILEGES ON ${process.env.PROD_DB_NAME}.* TO '${process.env.PROD_DB_USER}'@'${process.env.PROD_DB_HOST}'`);
        console.log("Granted all privileges to 'admin'");

        await connection.end();
        console.log("MySQL connection closed");
        
        rl.close();
    } catch (err) {
        console.error("Failed to setup database:", err);
        process.exit(1);
    }
}

setupDatabase();
