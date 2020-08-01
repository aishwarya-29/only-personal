var mongoose = require("mongoose");

var journalSchema = mongoose.Schema({
    data: String,
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: String,
    dateOfEntry : Date,
    imageID: String
});

module.exports = mongoose.model("Journal", journalSchema);