var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
    name: String,
    todo : [{
        type: 'String'
    }],
    user: String
});

module.exports = mongoose.model("todo", todoSchema);