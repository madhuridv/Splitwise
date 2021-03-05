const express = require("express");
const router = express();

router.post("/", (req, res) => {
  console.log("inside groups backend");
});

module.exports = router;
