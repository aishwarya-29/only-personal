var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleWare = require("../middleware"),
    todo = require("../models/todo"),
    done = require("../models/done");

router.use(bodyParser.json());
function checkLoggedIn(req, res, next) {
    if(middleWare.isLoggedIn) {
        next();
    } else {
        res.redirect("/");
    }
}


router.get("/wishlist",checkLoggedIn, function(req,res){
    res.render("wishlist/wishlist");
});

router.post("/addTodo", checkLoggedIn, function(req,res){
    var name = req.body.name;
    var newtodo = req.body.todo;
    todo.findOne({name: name,user:middleWare.username}, function(err,todoList){
        if(err) {
            console.log(err);
        } else {
            todoList.todo.push(newtodo);
            todoList.save();
            return res.send(todoList);
        }
    });
});

router.post("/deleteTodo", checkLoggedIn, function(req,res){
    var name = req.body.name;
    var doneTodo = req.body.todo;
    doneTodo = doneTodo.trim();
    todo.findOne({name: name}, function(err,x){
        if(err) {
            console.log(err);
        } else {
            const index = x.todo.indexOf(doneTodo);
            if (index > -1) {
                x.todo.splice(index, 1);
            }
            x.save();
            done.findOne({name: name}, function(err,donelist){
                if(err){
                    console.log(err);
                } else {
                    donelist.todo.push(doneTodo);
                    donelist.save();
                    var data = {
                        done: doneTodo
                    }
                    return res.send(data);
                }
            });
        }
    });
});

router.post("/deleteDone", checkLoggedIn, function (req, res) {
    var name = req.body.name;
    var doneTodo = req.body.todo;
    doneTodo = doneTodo.trim();
    done.findOne({
        name: name
    }, function (err, x) {
        if (err) {
            console.log(err);
        } else {
            const index = x.todo.indexOf(doneTodo);
            if (index > -1) {
                x.todo.splice(index, 1);
            }
            x.save();
            console.log("deleted");
        }
    });
});

router.get("/wishlist/movies", function(req,res){
    todo.findOne({name: "Movies",user:middleWare.username}, function(err, movies){
        if(err) {
            console.log(err);
        } else {
            done.findOne({name: "Movies"}, function(err,doneMovies){
                if(err) {
                    console.log(err);
                } else {
                    res.render("wishlist/movies", { movies: movies, doneMovies: doneMovies});
                }
            });
        }
    });
});

router.get("/wishlist/places", function(req,res){
    todo.findOne({
        name: "Places", user: middleWare.username
    }, function (err, places) {
        if (err) {
            console.log(err);
        } else {
            done.findOne({
                name: "Places"
            }, function (err, donePlaces) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("wishlist/places", {
                        places: places,
                       donePlaces:donePlaces
                    });
                }
            });
        }
    });
});

router.get("/wishlist/bucketlist", function(req,res){
     todo.findOne({
         name: "Things", user: middleWare.username
     }, function (err, things) {
         if (err) {
             console.log(err);
         } else {
             done.findOne({
                 name: "Things"
             }, function (err, doneThings) {
                 if (err) {
                     console.log(err);
                 } else {
                     res.render("wishlist/things", {
                         things: things,
                         doneThings: doneThings
                     });
                 }
             });
         }
     });
});

router.get("/wishlist/todo", function(req,res){
    todo.findOne({
        name: "ToDo", user: middleWare.username
    }, function (err, todolist) {
        if (err) {
            console.log(err);
        } else {
            done.findOne({
                name: "ToDo"
            }, function (err, doneTodo) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("wishlist/todo", {
                        todolist: todolist,
                        doneTodo: doneTodo
                    });
                }
            });
        }
    });
});

module.exports = router;