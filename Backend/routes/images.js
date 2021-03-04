const express = require("express");
const router = express.Router();
const pool = require("../connection");
const path = require("path");
const fs = require("fs");

router.get("/:user_image", (req, res) => {
  console.log("inside image");
  var image =
    path.join(__dirname, "..") + "/public/usersImage/" + req.params.user_image;
  
  let isPresent = fs.existsSync(image);
  console.log(isPresent);
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      path.join(__dirname, "..") + "/public/userImage/profile_icon.png"
    );
  }
});

module.exports = router;
