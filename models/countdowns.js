var mongoose = require("mongoose");

var countdownSchema = mongoose.Schema({
    date: Date,
    title: String,
    description: String
});

module.exports = mongoose.model("Countdown", countdownSchema);