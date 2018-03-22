var express = require('express');
var router = express.Router();
var db = require('./../models');

router.get('/', (req,res) => {
    db.Post.paginate({}, { page: 1, limit: 10 })
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.send(err);
    });
})

module.exports = router;