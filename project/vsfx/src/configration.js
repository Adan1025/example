"use strict";
const path = require("path");
module.exports = {
  // mysql配置
  mysql: {
    type: "mysql",
    host: "sh-cdb-ni6jbci3.sql.tencentcdb.com",
    username: "data",
    password: "hi!xkayd@2018#",
    database: "sf",
    port: "3306",
    acquireTimeout: "60 * 6 * 24",
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "../entity/*.js")]
  }
};
