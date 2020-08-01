var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleWare = require("../middleware"),
    db = require("../db"),
    Memory = require("../models/memory");

const upload = db.upload;
function checkLoggedIn(req, res, next) {
    if (middleWare.isLoggedIn) {
        next();
    } else {
        res.redirect("/");
    }
}


router.get("/gallery",checkLoggedIn, function(req, res){
    if(req.query) {
        var query = req.query;
        if(query.sortBy && query.from && query.to) {
            if(query.sortBy == 'Latest First') 
                var sort = -1;
            else 
                var sort = 1;
            Memory.find({
                    dateOfEntry: {
                        $gte: new Date(query.from),
                        $lt: new Date(query.to)
                    }
                })
                .sort({
                    dateOfEntry: sort
                })
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("gallery/gallery", {
                            memories: docs,
                            sort: query.sortBy,
                            from: query.from,
                            to: query.to
                        });
                    }
                });
        }
        else if ((query.sortBy && query.from && (!query.to)) || (query.sortBy && (!query.from) && query.to)) {
            alert("Invalid Date");
            return res.redirect("/gallery");
        }
        else if (query.sortBy)
        {
            if(query.sortBy == 'Latest First') {
                Memory.find({}).sort('-dateOfEntry').exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.render("gallery/gallery", {
                            memories: docs,
                            sort: "Latest First",
                            from: null,
                            to: null
                        });
                    }
                });
            }

            else if(query.sortBy == 'Oldest First') {
                Memory.find({}).sort('dateOfEntry').exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.render("gallery/gallery", {
                            memories: docs,
                            sort: "Oldest First",
                            from: null,
                            to: null
                        });
                    }
                });
            }
        }
        else if(query.from && query.to) {
            Memory.find({
                    dateOfEntry: {
                        $gte: new Date(query.from),
                        $lt: new Date(query.to)
                    }
                })
                .sort({
                    dateOfEntry: 1
                })
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("gallery/gallery", {
                            memories: docs,
                            sort: "Latest First",
                            from: query.from,
                            to: query.to
                        });
                    }
                });
        }
        else if(query.from || query.to) {
            alert("INVALID DATE");
            res.redirect("/gallery");
        }
        else 
        {
            Memory.find({}).sort('-dateOfEntry').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("gallery/gallery", {
                        memories: docs,
                        sort: null,
                        from: null,
                        to: null
                    });
                }
            });
        }

    }
});

router.get("/gallery", checkLoggedIn, function(req, res){
    var from = req.body.from;
    var to = req.body.to;
    console.log(from);
    console.log(to);
    Memory.find({
        dateOfEntry: {
            $gte: from,
            $lt: to
        }
    })
    .sort({dateOfEntry:1})
    .exec(function(err, docs){
    if(err) {
        console.log(err);
    } else {
        console.log("here");
        res.render("gallery/gallery", {
            memories: docs,
            sort: "Oldest First",
            from: from, to: to
        });
    }
});
});


router.get("/gallery/new", checkLoggedIn, function(req, res) {
    res.render("gallery/new");
});

router.post("/gallery/new", upload.array('files'), function(req,res){
    var images = req.files;
    var imagesId = [req.files[0].filename];
    for(var i=1;i<images.length; i++) {
        imagesId.push(images[i].filename);
    }
    Memory.create({
        title: req.body.memory.title,
        description: req.body.memory.desc,
        authorName: middleWare.username,
        dateOfEntry: req.body.memory.date,
        images: imagesId
    }, function(err, memory){
        if(err) {
            console.log(err);
        } else {
            console.log(memory);
            res.redirect("/gallery");
        }
    });
});

router.post("/gallery/:id", function(req,res){
    Memory.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.desc
    }, {
        new: true
    }
    ,
    function (err, memory) {
        if(err) {
            console.log(err);
        } else {
            console.log("updated");
            return res.send(memory);
        }
    });
});

router.post("/gallery/:id/delete", function(req,res){
    console.log(req.params.id);
    Memory.findByIdAndDelete(req.params.id, function(err, memory){
        if(err) {
            console.log(err);
        } else {
            console.log(memory);
            res.redirect("/gallery");
        }
    });
});

module.exports = router;