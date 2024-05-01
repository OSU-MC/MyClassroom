# Open-Source Classroom Polling Software
This project will develop a free, open-source, classroom polling website. Once developed, the project will be used in OSU classrooms and shared with instructors around the world. This project will include front end and back end web development, a Canvas / LMS interface, and responsive user interface development for live polling and advanced question formats on desktop, mobile, and other devices. Stretch goals include an intelligent grouping algorithm to pair students based on answers, tracking of students to give feedback to instructors, and an in-class social network for just-in-time Learning Assistant interventions.

## Objectives
Website interface, student/teacher login, and tracking of student grades, class questions, course lectures Live polling interface Bi-directional Canvas communication Intelligent grouping algorithm (stretch) Instructor feedback interface (stretch) In-class social network (stretch)

## Motivations
Currently, the only non-tuition cost for students in the Physics 20x sequence at OSU is an old, but necessary polling software. There are free alternatives available, but none feature intelligent grouping, and most are limited in question types. This project will provide a free option for teachers around the world, as well as an open-source starting point for developing more features. This project will save OSU students more than $6000 each year. It will also provide a more flexible, fully featured and integrated software.

## Qualifications
### Minimum Qualifications:
Website development experience (full stack, or client side, or server side) Problem solving skills Excellent communication skills Excellent teamwork skills

### Preferred Qualifications:
Learning Management System integration Algorithms

## Install
Install MySQL
- Refer to the [MySQL Getting Started Guide](https://dev.mysql.com/doc/mysql-getting-started/en/) for installing and troubleshooting MySQL.

Clone the GitHub Repository
```
git clone git@github.com:OSU-MC/MyClassroom.git
```

Install the application dependencies
```
npm install
```

## Configure
Setup custom environment variables
```
npm run setup
```
- The server can be reconfigured by modifying the `/server/.env` file. The `DEV_DB_...` and `TEST_DB_...` values should match those in the database/user creation commands listed in the setup steps below. Additionally, `CLIENT_URL` should be set to the front end application URL. For basic testing, the default values can be used.
- The client can be reconfigured by modifying the `/client/.env` file. `REACT_APP_API_URL` should be set to the backend URL. For basic testing, the default values can be used.


Connect to the MySQL Database using the Root User
```
mysql -u root -p
```

Create the Application Database
```
CREATE DATABASE myclassroom;
```

Create the Administrative Database User
```
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Password_1';
```

Grant the Administrative User Access to the Application Database
```
GRANT ALL PRIVILEGES ON myclassroom.* TO 'admin'@'localhost';
```

Disconnect from the MySQL Database
```
exit
```

Migrate the Database using Sequelize
```
npm run migrate-db
```

## Setup Backend Testing Environment
Connect to the MySQL Database using the Root User
```
mysql -u root -p
```

Create the Test Application Database
```
CREATE DATABASE myclassroom_test;
```

Create the Testing Administrative Database User
```
CREATE USER 'testadmin'@'localhost' IDENTIFIED BY 'Password_2';
```

Grant the Testing Administrative User Access to the Test Application Database
```
GRANT ALL PRIVILEGES ON myclassroom_test.* TO 'testadmin'@'localhost';
```

Disconnect from the MySQL Database
```
exit
```

Migrate the Test Database using Sequelize
```
npm run migrate-db:test
```

Seed the Test Database using Sequelize
```
npm run seed-db:test
```

## Resetting/Rolling Back Databases
(Append `npx` commands with `--env test` to run on the test database)

Undo Database Migrations
```
npm run unmigrate-db
```

Undo Test Database Seeding
```
npm run unseed-db
```

Reset Local Database
```
mysql -u root -p
```
```
DROP DATABASE myclassroom;
```
or
```
DROP DATABASE myclassroom_test;
```

## Starting the Application
```
npm start
```

## Testing the Application
Testing the application is easy. The Jest testing framework is used to write tests for the system. A script has been added to the package.json file to run tests locally:
```
npm test
```

If you run into issues, ensure you have done the following:
1. Created a local test database
2. Properly instantiated all env variables for the test environment
