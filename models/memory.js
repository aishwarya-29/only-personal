var mongoose = require("mongoose");

var memorySchema = mongoose.Schema({
    title: String,
    description: String,
    authorName: String,
    dateOfEntry: Date,
    images: [{
        type: 'String'
    }]
});

module.exports = mongoose.model("Memory", memorySchema);