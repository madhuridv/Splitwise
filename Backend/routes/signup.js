const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../connection");

router.post("/", (req, res) => {
  console.log("inside signup");
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let sql = `CALL insertUser('${req.body.username}', '${req.body.email}', '${hashedPassword}');`;

  pool.query(sql, (err, result) => {
    console.log("result is", result);
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }

    if (result && result.length > 0 && result[0][0].status === "USER_ADDED") {
      let userObject = {
        id: result[0][0].id,
        username: result[0][0].username,
        email: result[0][0].email,
      };
      console.log("userObject", userObject);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(userObject));
      //res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "USER_EXISTS"
    ) {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

module.exports = router;
