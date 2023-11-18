const express = require("express");
const route = express.Router();
const loginController = require("./src/controllers/loginController");

route.get("/", (req, res) => {
  res.send("Ta funcionando seu corno");
});
route.post("/login/register", loginController.register);

module.exports = route;
