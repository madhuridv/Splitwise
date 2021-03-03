const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../connection');

router.get('/:user_id', (req, res) => {
    
    let sql = `CALL getUserDetails('${req.params.user_id}', NULL);`;
    pool.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      console.log("result is:",result);
      if (result && result.length > 0 && result[0][0]) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0]));
      }
    });
  });

  module.exports = router;