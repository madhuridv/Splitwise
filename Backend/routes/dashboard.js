const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/owedata", (req, res) => {
  console.log("inside dashboard owe data");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "select groupName,round(sum(amtToPay),2) as totalOwesAmount from splitwise.balance where lentTo = ? group by groupName";

  pool.query(sql, [user_id], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/oweddata", (req, res) => {
  console.log("inside dashboard owed data");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "select groupName,round(sum(amtToPay),2) as totalOwedAmount from splitwise.balance where payableTo = ? group by groupName";

  pool.query(sql, [user_id], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/settleup", (req, res) => {
  console.log("inside settle up backend");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "DELETE FROM splitwise.balance WHERE lentTo=? ORDER BY createdAt DESC LIMIT 1;";

  pool.query(sql, [user_id], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log(
      "Number of records inserted for Expense table: ",
      result.affectedRows
    );
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
  });
});
module.exports = router;
