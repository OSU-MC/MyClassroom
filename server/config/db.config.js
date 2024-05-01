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
    "port": process.env.DEV_DB_PORT || 3306,
    "dialect": "mysql"
  },
  "test": {
     "username": process.env.TEST_DB_USER || 'myclassroom',
     "password": process.env.TEST_DB_PASS || null,
     "database": process.env.TEST_DB_NAME || 'myclassroom_test',
     "host": process.env.TEST_DB_HOST || 'localhost',
     "port": process.env.TEST_DB_PORT || 3306,
     "dialect": "mysql"
   },
  "production": {
    "username": process.env.PROD_DB_USER,
    "password": process.env.PROD_DB_PASS,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_HOSTNAME,
    "dialect": "mysql",
    "ssl": 'Amazon RDS',
    "port": process.env.PROD_DB_PORT || 3306
  }
}
