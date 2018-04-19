const express = require('express'),
    db = require('./../models'),
    isLoggedAndAuth = require('./../middlewares/auth'),
    helpers = require('./../helpers/posts');

const router = express.Router();

router.route('/')
    .get(helpers.getPosts)
    .post(isLoggedAndAuth, helpers.createPost)


router.route('/:postId')
    .get(helpers.showPost)
    .put(isLoggedAndAuth, helpers.updatePost)
    .delete(isLoggedAndAuth, helpers.deletePost)

module.exports = router;