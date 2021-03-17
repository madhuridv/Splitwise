const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/getexpensedetails", (req, res) => {
  console.log("inside get expense");
  let groupName = req.body.groupNameFromProps;
  console.log(req.body.groupNameFromProps);
  let sql =
    "select expenseDescription,amount,groupName,DATE_FORMAT(createdAt,'%b-%Y') as Date,addedBy from splitwise.expense where groupName=? order by createdAt desc";
  pool.query(sql, [groupName], (err, result) => {
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
    console.log("result is:", JSON.stringify(result));
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

// router.post("/expense", async (req, res) => {
//   console.log("inside Add expense");
//   const expenseDesc = req.body.description;
//   const amount = req.body.amount;
//   const groupName = req.body.groupName;
//   const createdBy = req.body.addedBy;
//   let insertExpenseSql =
//     "INSERT INTO splitwise.expense (expenseDescription, amount, groupName,addedBy) VALUES(?,?,?,?)";

//   var insertquery = await pool.query(
//     insertExpenseSql,
//     [expenseDesc, amount, groupName, createdBy],
//     (err, result) => {
//       console.log("Insert result is:", result);
//     }
//   );

//   //console.log("insert query results:", insertquery);

//   let selectGroupMem =
//     "SELECT groupMembers FROM splitwise.groupDetails WHERE groupName=?";

//   var selectquery = await pool.query(
//     selectGroupMem,
//     [groupName],
//     (err, result) => {
//       console.log("Select Query result is:", result);
//     }
//   );
//   //console.log(selectquery);
// });
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
