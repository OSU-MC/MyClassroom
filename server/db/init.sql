CREATE DATABASE IF NOT EXISTS myclassroom_development;
CREATE USER IF NOT EXISTS 'dev_admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON myclassroom_development.* TO 'dev_admin'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS myclassroom_test;
CREATE USER IF NOT EXISTS 'test_admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON myclassroom_test.* TO 'test_admin'@'%';
FLUSH PRIVILEGES;
