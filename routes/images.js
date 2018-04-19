const express = require('express'),
    isLoggedAndAuth = require('./../middlewares/auth'),
    helpers = require('./../helpers/images'),
    db = require('./../models'),
    multer = require('multer');

const upload = multer({ dest: 'public/uploads' });
const router = express.Router();

router.route('/')
    .get(isLoggedAndAuth, helpers.getImages)
    .post(isLoggedAndAuth, upload.single('upload'), helpers.createImage)

module.exports = router;