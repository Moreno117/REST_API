const express = require('express'),
    db = require('./../models'),
    passport = require('passport');
    helpers = require('./../helpers/users');

const router = express.Router();

router.route('/')
    .get(helpers.getUsers)
    .post(helpers.createUser)

router.post("/login", passport.authenticate("local"),
    (req, res) => {
        res.send({ message:'User authenticated', code: 200 })
    });
    
router.get("/logout", (req, res) => {
    req.logout();
    res.send({message: 'Success logout', code: 200 });
});

module.exports = router;