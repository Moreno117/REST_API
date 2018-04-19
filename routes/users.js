const express = require('express'),
    db = require('./../models'),
    jwt = require("jsonwebtoken"),
    passport = require('passport'),
    helpers = require('./../helpers/users');


const router = express.Router();
const secret = 'Requiem 1170'

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

    // (req, res) => {
    //     res.send({ message:'User authenticated', code: 200 })
    // });
    

router.get("/logout", (req, res) => {
    req.logout();
    res.send({message: 'Success logout', code: 200 });
});

module.exports = router;