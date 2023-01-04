# My-Classroom-Backend

## Setting Up

### Requirements

- node: 16.13.0
- npm: 9.1.2

### Configuring Local Database

This process can and should be followed for instantiating both the local development and local testing database.

Install MySQL (and MySQL Workbench recommended): https://dev.mysql.com/doc/mysql-getting-started/en/
Pay attention to setting of the root user password, and take note of what is necessary.

In the Command Line:
1. MySQL as root user: `mysql -u root -p`
2. Create a User: `CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';`
3. Create a Table: `CREATE DATABASE 'database_name';`
4. Grant Permissions: `GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';`
5. Check Success: `SHOW DATABASES;`

If having issues, refer to the MySQL Getting Started Guide: https://dev.mysql.com/doc/mysql-getting-started/en/

### Configuring Local Environment

Copy the `.env.example` file into a `.env` file

Configure the database environment variables to match the database name, user, and password used when setting up the databases for development and test

## Starting the Application

`npm run start`

## Testing the Application

Testing the application is easy. The Jest testing framework is used to write tests for the system. A script has been added to the package.json file to run tests locally:

`npm run test`

If you run into issues, ensure you have done the following:

1. Created a local test database
2. Properly instantiated all env variables for the test environment