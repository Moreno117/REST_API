const express = require("express"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    cloudinary = require("cloudinary"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    db = require("./models");
    _ = require("lodash"),
    jwt = require('jsonwebtoken')
    passportJWT = require("passport-jwt");
    app = express();

// Utils
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

// ********** CORS ***********
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// ******** PASSPORT *********
// app.use(
//     require("express-session")({
//         secret: "Site of the year 2018",
//         resave: false,
//         saveUninitialized: false
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy({ session: false },
    function(username, password, done) {
      return db.User.findOne({ username: username })
      .then(user => {
          if(!user){
            return done(null, false, { message: 'User not found' })
          }
          return done(null, user, {message: 'Logged In Successfully'})
      })
      .catch(error => done(error));
    }
));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Spread id on the routes
// app.use(function (req, res, next) {
//     res.locals.currentUser = req.user;
//     next();
// });

// ********* ROUTING ************
// Requiring routes
let postRoutes = require('./routes/posts'),
    imagesRoutes = require('./routes/images'),
    userRoutes = require('./routes/users');

// app.use("/", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/images", imagesRoutes);

// ********* ROUTES ************
app.get('/', (req, res) => {
    res.send("Landing here");
});

// *********** PORTS *************
app.listen(process.env.PORT || 8000, process.env.IP, () => {
    console.log('API up and running');
})