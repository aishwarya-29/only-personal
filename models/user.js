var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    journalLock: String,
    imageURL: String,
    email: String
});

module.exports = mongoose.model("User", userSchema);