var express = require("express"),
    router = express.Router(),
    middleWare = require("../middleware"),
    db = require("../db"),
    User = require("../models/user"),
    todo = require("../models/todo"),
    done = require("../models/done");


const upload = db.upload;

router.get("/admin", function (req, res) {
    if (middleWare.isLoggedIn) {
        res.redirect("/admin/" + middleWare.username);
    } else {
        res.render("admin/admin");
    }
});

router.post("/admin", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user.password == password) {
                res.redirect("/home");
                middleWare.isLoggedIn = true;
                middleWare.username = user.name;
                middleWare.email = email;
            } else {
                res.redirect("/");
            }
        }
    });
});

router.get("/admin/:name",  function (req, res) {
    var name = req.params.name;
    if(middleWare.username == name) {
    User.findOne({
        name: name
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/profile", {
                user: user
            });
        }
    });
    } else {
        res.redirect("/");
    }
});

router.post("/logout", function (req, res) {
    middleWare.isLoggedIn = false;
    middleWare.username = null;
    res.redirect("/");
});

router.post("/admin/:name/update", function (req, res) {
    var key = req.body.key;
    var change = req.body.change;
    User.findOne({
        name: req.params.name
    }, function (err, user) {
        if (err)
            console.log(err);
        else {
            user[key] = change;
            console.log("chnage");
            user.save();
            res.redirect("/admin/" + user.name);
        }
    });
});

router.post("/admin/:name/image", upload.single('file'), function (req, res) {
    if (req.file) {
        console.log(req.file);
        User.findOne({
            name: req.params.name
        }, function (err, user) {
            if (err) {
                res.redirect("/admin/" + user.name);
            } else {
                console.log("here");
                user.imageURL = req.file.filename;
                res.redirect("/admin/" + user.name);
                user.save();
            }
        });
    }
    console.log(req.body);
});

router.post("/admin/new", function(req,res){
    if(req.body.password === req.body.password2) {
        User.create(req.body, function(err,newUser){
            if(err)
                console.log(err);
            else {
                newUser.imageURL = "fa7c29746bd1df2126c8331c6cfeda9b.png";
                todo.create({
                    name: "Movies",
                    user: newUser.name,
                    todo: []
                });
                todo.create({
                    name: "Things",
                    user: newUser.name,
                    todo: []
                });
                todo.create({
                    name: "Places",
                    user: newUser.name,
                    todo: []
                });
                todo.create({
                    name: "ToDo",
                    user: newUser.name,
                    todo: []
                });
                done.create({
                    name: "Movies",
                    user: newUser.name,
                    todo: []
                });
                done.create({
                    name: "Things",
                    user: newUser.name,
                    todo: []
                });
                done.create({
                    name: "Places",
                    user: newUser.name,
                    todo: []
                });
                done.create({
                    name: "ToDo",
                    user: newUser.name,
                    todo: []
                });
                res.redirect("/home");
                middleWare.isLoggedIn = true;
                middleWare.username = newUser.name;
                middleWare.email = newUser.email;
                
            }
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;