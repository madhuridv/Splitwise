const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/expense", (req, res) => {
  console.log("inside expense backend");
  console.log(req.body.description);
  let sql = `CALL insertExpense('${req.body.description}','${req.body.amount}','${req.body.groupName}','${req.body.addedBy}')`;

  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result is:", result);
    if (
      result &&
      result.length > 0 &&
      result[0][0].status === "EXPENSE_ADDED"
    ) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.post("/getGroup", (req, res) => {
  console.log("inside getGroup backend");
  const groupMember = req.body.groupMember;
  console.log("req.body : ", req.body);
  let sql =
    "select distinct groupName, isAccepted from splitwise.groupDetails where groupMembers=?";
  console.log(sql);
  pool.query(sql, [groupMember], (err, result) => {
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

router.post("/joingroup", (req, res) => {
  console.log("inside jongroup backend");
  const groupMember = req.body.groupMember;
  console.log("groupMember", groupMember);
  console.log("req.body : ", req.body);
  let sql = `CALL acceptInvite('${req.body.groupName}','${groupMember}')`;
  console.log(sql);
  pool.query(sql, [groupMember], (err, result) => {
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

module.exports = router;
