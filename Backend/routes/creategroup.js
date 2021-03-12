const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/", (req, res) => {
  console.log("inside groups backend");
});

router.get("/getUser", (req, res) => {
  console.log("inside get groups");
  let sql = `select distinct id,username,email from splitwise.users`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});
module.exports = router;
