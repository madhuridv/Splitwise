const { Sequelize } = require("sequelize");
const db = require("../../connection");

const userModel = db.define("user", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true }
  
});

module.exports = userModel;
