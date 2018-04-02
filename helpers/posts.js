const db = require('./../models');

exports.getPosts = (req, res) => {
    let { page, size } = req.query;
    if(page === undefined || size === undefined) page = 1, size = 10
    db.Post.paginate({}, { page: Number(page), limit: Number(size) })
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.send(err);
    });
};

exports.createPost = (req, res) => {
    const { title, content, image, author } = req.body;
    // const { filename } = req.file;
    const resume = content.substring(0, 250);
    // ***** Upload image *******
    // cloudinary.uploader.upload(`public/uploads/${filename}`, (result) => {
    //     const imagePath = result.url;
    // });

    const userPost = {
        title: title,
        author: author,
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
};

exports.showPost = (req, res) => {
    db.Post.findById(req.params.postId)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            res.send(err);
        });
};

exports.updatePost = (req, res) => {
    db.Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true })
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.send(err);
    });
};

exports.deletePost = (req, res) => {
    db.Post.remove({ _id: req.params.postId })
    .then(() => {
        res.json({
            message: "Post deleted!"
        });
    })
    .catch(err => {
        res.send(err);
    });
};

module.exports = exports;
