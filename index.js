const express = require("express"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    cloudinary = require("cloudinary"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    _ = require("lodash"),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const APIS = require('./utils');

app.get('/', (req, res) => {
    res.send('API UP');
});

app.listen(process.env.PORT || 8000, process.env.IP, () => {
    console.log('API up and running');
})