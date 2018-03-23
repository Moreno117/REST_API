const db = require('./../models');

exports.getPosts = (req, res) => {
    db.Post.paginate({}, { page: 1, limit: 10 })
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.send(err);
    });
};

exports.createPost = (req, res) => {
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
