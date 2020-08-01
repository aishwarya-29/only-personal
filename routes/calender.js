var express = require("express"),
    router = express.Router(),
    middleWare = require("../middleware"),
    Event = require("../models/event");

function checkLoggedIn(req, res, next) {
    if (middleWare.isLoggedIn) {
        next();
    } else {
        res.redirect("/");
    }
}
router.get("/calender", checkLoggedIn, function(req,res){
    if(req.query.month) {
    var value = null;
    var d = new Date(req.query.month + '-01');
    var from = new Date(req.query.month + '-01');
    var to = new Date(req.query.month + '-31');
    value = req.query.month;
    } 
    else {
        var d = new Date("2020-07-01");
        var from = d;
        var to = new Date("2020-07-31");
    }
    Event.find({
        date: {
            $gte: from,
            $lt: to
            }
        }).exec(function(err, events){
        if(err) {
            console.log(err);
        } else {
            var dates = [];
            events.forEach(function(event){
                dates.push(event.date.getDate());
            });
            res.render("calender/calender", {
                date: d, events: events, dates: dates, value: value
            })
        }
    });
});

router.post("/calender/addEvent", checkLoggedIn, function(req,res){
    var newData = req.body;
    Event.create(newData, function(err, newEvent) {
        if(err) {
            console.log(err);
        } else {
            console.log("created");
            return res.send(newEvent);
        }
    });
});

module.exports = router;