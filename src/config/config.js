// const dotenv = require("dotenv").config();
const {
  KLOG_USERNAME,
  KLOG_PWD,
  KLOG_DBNAME,
  KLOG_DEV_USERNAME,
  KLOG_DEV_PWD,
  KLOG_DEV_DBNAME,
} = process.env;
// console.log(`%c${KLOG_DEV_USERNAME}`, "color: red");
// console.log(`%c${KLOG_USERNAME}`, "color: red");
// console.log(`%c${process.env.NODE_ENV}`, "color: red");

const config = {
  development: {
    username: KLOG_DEV_USERNAME,
    password: KLOG_DEV_PWD,
    database: KLOG_DEV_DBNAME,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: false,
  },
  test: {
    username: KLOG_USERNAME,
    password: KLOG_PWD,
    database: KLOG_DBNAME,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
  production: {
    username: KLOG_USERNAME,
    password: KLOG_PWD,
    database: KLOG_DBNAME,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: false,
  },
};

export default config;

// module.exports = config;
