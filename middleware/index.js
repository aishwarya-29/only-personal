//ADMIN ACCESS
var User = require("../models/user");

var middleWareObj = {};
middleWareObj.isLoggedIn = false;
middleWareObj.username = "";
middleWareObj.email = "";

module.exports = middleWareObj;