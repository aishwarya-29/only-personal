var express = require("express"),
    router = express.Router();

router.get("/about", function (req, res) {
    res.send("Page under construction");
});
module.exports = router;



