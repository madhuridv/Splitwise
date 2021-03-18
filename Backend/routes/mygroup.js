const express = require("express");
const router = express();
const pool = require("../connection");





//from mygroups page
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

//from show groups page
router.post("/getmembers", (req, res) => {
  console.log("inside get Members");
  const gName = req.body.gName;
  console.log("gName", gName);
  console.log("req.body : ", req.body);
  let sql = `select groupMembers from splitwise.groupDetails where groupName=?`;
  console.log(sql);
  pool.query(sql, [gName], (err, result) => {
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
