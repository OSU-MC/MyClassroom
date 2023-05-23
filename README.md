# My-Classroom-Backend

## Setting Up

### Dependencies

- node: 16.13.0
- npm: 9.1.2
- mysql: 8.0.31

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

Once the database has been made in mysql, using sequelize command line tools, database migrations need to be run to create the database
- To migrate forward: `npx sequelize-cli db:migrate`
- To migrate backward: `npx sequelize-cli db:migrate:undo` - add `:all` to undo all the migrations instead of just 1
To do this in the test environment, simply add `--env test` to the end of the command

After migrations have been done, local testing data can be added to the database using sequelize seeders
- To create: `npx sequelize-cli db:seed:all`
- To delete: `npx sequelize-cli db:seed:undo` - add `:all` to undo all the seeds instead of just 1

If having issues, refer to the MySQL Getting Started Guide: https://dev.mysql.com/doc/mysql-getting-started/en/

If you need to reset your local dev or test databases, login to MySQL as the root user (step 1), and run `DROP DATABASE database_name;`. Then, rerun steps 3 and 4. 

### Configuring Local Environment

Copy the `.env.example` file into a `.env` file

- Configure the database environment variables to match the database name, user, and password used when setting up the databases for development and test
- Set `CLIENT_URL` to the front end application URL

## Starting the Application

`npm run start`

## Testing the Application

Testing the application is easy. The Jest testing framework is used to write tests for the system. A script has been added to the package.json file to run tests locally:

`npm run test`

If you run into issues, ensure you have done the following:

1. Created a local test database
2. Properly instantiated all env variables for the test environment

## Application Authentication & Session

The application uses cookie-based authentication once a user session has been created (i.e. a user has logged in). A user's session will have a specific XSRF token value associated with it to protect against XSRF attacks. As such, the value of that token will be sent back as a cookie, and the application expects to recieve with each authenticated request a custom X-XSRF-TOKEN header with that value, along with the traditional authentication cookie _myclassroom_session which the application generated as part of initial session creation.

A user's session is valid for a minimum of 4 hours, and as long as the user is active within 4 hours of last activity, the session can be valid for as long as 24 hours. In other words, users will be asked to login again after 4 hours of inactivity or 24 hours since they last provided their credentials.

## Configuring Services

### Emailer

The application is configured to use Courier notification infastructure to message users. In order to use the application's mailer, create an account at https://www.courier.com/. Follow Courier's setup instructions and prompts.

The process should yield a bearer token in the HTTPS request Courier generates. Copy this token, and paste it in the application environment as `COURIER_AUTH_TOKEN`. Also set `EABLE_EMAIL='true'`. That's it! You should be able to interact with the configured emailer through Courier.

It's worth noting that the application is only configured for email use through Courier, but Courier supports a variety of modern notification methods.

## Roadmap

- Learning Management System (LMS) Integration
- Expanded Question Type Support
- WebSocket Open Polling Connection for Live Updates and Feedback
- Upgrade Test Suite to Heavier Duty Framework
- Smart Classmate Pairing Suggestions
- Request Rate Limiting

## Database Figures

![Database Schema](https://github.com/CS461PollingApplication/my-classroom-backend/blob/master/schema.PNG?raw=true)

[API Endpoints Doc](https://github.com/CS461PollingApplication/my-classroom-backend/blob/master/API%20Endpoints%20MyClassroom.pdf)

## Getting Involved

Feel free to open an issue for feature requests or bugs. We openly accept pull requests for bug fixes.

## Licensing

GNU General Public License v3.0
