var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    db = require("../db"),
    middleWare = require("../middleware"),
    User = require("../models/user"),
    Journal = require("../models/journal");

var jsonParser = bodyParser.json();
const upload = db.upload;

function checkLoggedIn(req, res, next) {
    if (middleWare.isLoggedIn) {
        next();
    } else {
        res.redirect("/");
    }
}

router.post("/journal/:name", jsonParser, function(req,res){
    var password = req.body.password;
    User.findOne({name: req.params.name}, function(err,user){
        if(err) {
            console.log(err);
        } else {
            if(user.journalLock == password) {
                user1 = true;
                console.log(req.params.name);
                res.redirect("/journal/" + req.params.name);
            } else {
                res.redirect("/journal")
            }
        }
    });
});

router.get("/journal",checkLoggedIn, function(req, res){
    Journal.find({authorName: middleWare.username}, function(err, journals){
        if(err) {
            console.log(err);
            res.redirect("/home");
        } else {
            res.render("journal/user", {journals: journals});
        }
    });  
});


router.post("/journal/:name/new", upload.single('file'), function (req, res) {
    var name = middleWare.username;
    var entry = ltrim(req.body.entry);
    var title = req.body.title;
    var now = new Date();
    if (req.file) {
        var filename = req.file.filename;
        req.file.key = middleWare.username;
        console.log(req.file);
        console.log(req.file.key);
    } else {
        var filename = "";
    }
    User.findOne({
        name: name
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            var newEntry = {
                data: entry,
                author: user,
                dateOfEntry: now,
                authorName: name,
                title: title,
                imageID: filename
            }
            Journal.create(newEntry, function (err, newEntry) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("created");
                    res.redirect("/journal");
                }
            });
        }
    });
});



router.get("/journal/:id",checkLoggedIn, function(req,res){
    var id = req.params.id;
    Journal.findById(id, function(err, journal){
        if(err) {
            console.log(err);
        } else {
            res.render("journal/view",{journal:journal});
        }
    });
});

router.post("/journal/:id/update", jsonParser, function(req,res){
    console.log("here");
    var entry = req.body.entry;
    console.log(entry);
    Journal.findByIdAndUpdate(req.params.id,{data: entry}, function(err,journal){
        if(err) {
            console.log(err);
        } else {
            journal.data = entry;
            console.log("updated!");
            return res.send(journal);
        }
    });
});

router.post("/journal/:id/delete", function(req,res){
   Journal.findByIdAndDelete(req.params.id, function(err,journal){
        if(err) {
            console.log(err);
        } else {
            console.log("deleted");
            res.redirect("/journal");
        }
   });
});

function ltrim(str) {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
}
module.exports = router;