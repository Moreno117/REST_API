var express = require('express');
var db = require('./../models');

const router = express.Router();

router.get('/', (req,res) => {
    db.Post.paginate({}, { page: 1, limit: 10 })
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.send(err);
    });
});

router.post('/', (req,res) => {
    const { title, content, image } = req.body;
    // const { filename } = req.file;
    const resume = content.substring(0, 250);
    // ***** Upload image *******
    // cloudinary.uploader.upload(`public/uploads/${filename}`, (result) => {
    //     const imagePath = result.url;
    // });

    const userPost = {
        title: title,
        image: image,
        content: content,
        resume: resume
    };
    
    db.Post.create(userPost)
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.send(err);
    });
});

router.get('/:postId', (req,res) => {
    db.Post.findById(req.params.postId)
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;