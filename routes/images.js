const express = require('express'),
    db = require('./../models'),
    helpers = require('./../helpers/images'),
    multer = require('multer');

const upload = multer({ dest: 'public/uploads' });

const router = express.Router();

router.route('/')
    .get(helpers.getImages)
    .post(upload.single('upload'), helpers.createImage)

// router.post('/', upload.single('upload'))

module.exports = router;