"use strict";
const path = require("path");
module.exports = {
  // mysql配置
  mysql: {
    type: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "",
    database: "sf",
    port: "3306",
    acquireTimeout: "60 * 6 * 24",
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "../entity/*.js")]
  }
};
