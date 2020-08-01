var mongoose = require("mongoose");

var doneSchema = mongoose.Schema({
    name: String,
    todo: [{
        type: 'String'
    }],
    user: String
});

module.exports = mongoose.model("done", doneSchema);