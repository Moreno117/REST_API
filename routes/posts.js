const express = require('express'),
    isLoggedAndAuth = require('./../middlewares/auth'),
    helpers = require('./../helpers/posts'),
    db = require('./../models');

const router = express.Router();

router.route('/')
    .get(helpers.getPosts)
    .post(isLoggedAndAuth, helpers.createPost)


router.route('/:postId')
    .get(helpers.showPost)
    .put(isLoggedAndAuth, helpers.updatePost)
    .delete(isLoggedAndAuth, helpers.deletePost)

module.exports = router;