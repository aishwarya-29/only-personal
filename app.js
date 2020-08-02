var express             =       require("express"),
    app                 =       express(),
    bodyParser          =       require("body-parser"),
    mongoose            =       require("mongoose"),
    methodOverride      =       require("method-override"),
    middleWare          =       require("./middleware"),
    config              =       require("./config"),
    path                =       require("path"),
    crypto              =       require("crypto"),
    multer              =       require("multer"),
    GridFsStorage       =       require("multer-gridfs-storage"),
    Grid                =       require("gridfs-stream");

app.set("view engine", "ejs");
var jsonParser = bodyParser.json();

// middleWare
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
    res.locals.isLoggedIn = middleWare.isLoggedIn;
    res.locals.username = middleWare.username;
    next();
});

var mongoURI = config.mongoURI;
mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
        });
var conn = mongoose.connection;

// GridFS
//initialise gfs
let gfs;
conn.once('open', function () {
    // initialised stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "folder1"
    });
});

//create storage engine

var storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'folder1',
                    key: String
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({
    storage
});

middleWare.isLoggedIn = false;
middleWare.email = "";
middleWare.username = "";
//ROUTES
var aboutRoutes         =       require("./routes/about"),
    wishlistRoutes      =       require("./routes/wishlist"),
    journalRoutes       =       require("./routes/journal"),
    calenderRoutes      =       require("./routes/calender"),
    galleryRoutes       =       require("./routes/gallery"),
    adminRoutes         =       require("./routes/admin") ;

app.use(aboutRoutes);
app.use(wishlistRoutes);
app.use(journalRoutes);
app.use(calenderRoutes);
app.use(galleryRoutes);
app.use(adminRoutes);

function checkLoggedIn(req, res, next) {
    if (middleWare.isLoggedIn) {
        res.redirect("/home");
    } else {
        next();
    }
}

//ROUTES
app.get("/", checkLoggedIn, function (req,res){
   res.render("auth.ejs");
});

app.get("/home", function (req,res) {
    res.render("home2");
});

app.get("/surprise", function(req,res){
    res.render("surprise");
});

app.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
        .find({
            filename: req.params.filename
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        });
});



var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});