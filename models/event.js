var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
    date: Date,
    content: String
});

module.exports = mongoose.model("Event", eventSchema);