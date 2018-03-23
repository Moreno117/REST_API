const express = require('express'),
    db = require('./../models'),
    helpers = require('./../helpers/posts');


const router = express.Router();

router.route('/')
    .get(helpers.getPosts)
    .post(helpers.createPost)


router.route('/:postId')
    .get(helpers.showPost)
    .put(helpers.updatePost)
    .delete(helpers.deletePost)


module.exports = router;