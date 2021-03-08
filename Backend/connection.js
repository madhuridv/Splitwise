const mysql = require("mysql");
const myPort = 3305;
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "rds-mysql-madhuridv.clc2w9lpegfh.us-west-2.rds.amazonaws.com",
  user: "madhuridv",
  port: myPort,
  password: "madhuridv",
  database: "splitwise",
});

pool.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
  console.log("Connected to database");
});

module.exports = pool;
