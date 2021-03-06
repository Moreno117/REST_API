const express = require('express'),
    isLoggedAndAuth = require("./../middlewares/auth"),
    helpers = require('./../helpers/users'),
    passport = require('passport'),
    jwt = require("jsonwebtoken"),
    db = require('./../models');

const APIS = require("./../util");
const router = express.Router();
const secret = APIS.AUTH_SALT;

router.route('/')
    .get(helpers.getUsers)
    .post(helpers.createUser)

router.post("/login", function (req, res, next) {
    passport.authenticate("local", { session: false }, function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ status: 'error', code: "No authorized" });
        } else {
            return res.json({ token: jwt.sign({ id: user.id }, secret), message: "Authorized and tokeni-zed" });
        }
    })(req, res, next)
});

router.get("/logout", (req, res) => {
    req.logout();
    res.send({message: 'Success logout', code: 200 });
});

module.exports = router;