const express = require("express"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    cloudinary = require("cloudinary"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    db = require("./models");
    _ = require("lodash"),
    app = express();

const APIS = require("./util");
const User = db.User;

// Helper for parse HTML
app.locals.htmlParsed = html => _.escape(html).replace(/\n/g, "<br>");
// Use static assets
app.use(express.static("public"));
// Setting up Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Setting up UPDATE method-override
app.use(methodOverride("_method"));
// Setting up cloudinanry
cloudinary.config(APIS.CLOUDINARY);

// Passport configuration
app.use(
    require("express-session")({
        secret: "Site of the year 2018",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Spread id on the routes
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ********* ROUTES ************
app.get('/', (req, res) => {
    if(err){
        console.log('err')
    } else {
        res.send('API UP');
    }
});

app.listen(process.env.PORT || 8000, process.env.IP, () => {
    console.log('API up and running');
})