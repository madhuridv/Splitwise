const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../connection");

console.log("inside post login request");
router.post("/", (req, res) => {
  let sql = `CALL getPassword('${req.body.email}');`;

  pool.query(sql, (err, result) => {
    console.log(result[0][0]);
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.send("Database Error");
    }

    if (result && result.length > 0 && result[0][0].status) {
      let isMatch = bcrypt.compareSync(
        req.body.password,
        result[0][0].password
      );

      if (isMatch) {
        res.cookie("cookie", "admin", {
          maxAge: 90000000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = req.body.email;
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
      } else {
        res.writeHead(401, {
          "Content-Type": "text/plain",
        });
        res.end("INCORRECT_PASSWORD");
      }
    } else {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end("NO_USER");
    }
  });
});

module.exports = router;
