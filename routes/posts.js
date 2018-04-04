const express = require('express'),
    db = require('./../models'),
    helpers = require('./../helpers/posts');
    isLoggedIn = require('./../helpers/middleware');

const router = express.Router();

router.route('/')
    .get(helpers.getPosts)
    .post(isLoggedIn, helpers.createPost)


router.route('/:postId')
    .get(helpers.showPost)
    .put(isLoggedIn, helpers.updatePost)
    .delete(isLoggedIn, helpers.deletePost)

module.exports = router;