const env = process.env.NODE_ENV || 'development'
if (env === 'development' || env === 'test') { // dotenv file will only be used in dev and testing
  require('dotenv').config({ override: false}); // will not override current environment variables if they exist
}

module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER || 'myclassroom',
    "password": process.env.DEV_DB_PASS || null,
    "database": process.env.DEV_DB_NAME || 'myclassroom_development',
    "host": process.env.DEV_DB_HOST || 'localhost',
    "dialect": "mysql"
  },
  "test": {
     "username": process.env.TEST_DB_USER || 'myclassroom',
     "password": process.env.TEST_DB_PASS || null,
     "database": process.env.TEST_DB_NAME || 'myclassroom_test',
     "host": process.env.TEST_DB_HOST || 'localhost',
     "dialect": "mysql"
   },
  // TODO: once these environments are setup, configure the sequelize connection with the right variables
  // "staging": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_staging",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
}
