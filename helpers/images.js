const db = require('./../models');
const cloudinary = require("cloudinary");

exports.getImages = (req,res) => {
    let { page, size } = req.query;
    if (page === undefined ||  size === undefined) page = 1, size = 10
    db.Image.paginate({}, { page: Number(page), limit: Number(size) })
    .then(images => {
        res.json(images);
    })
    .catch(err => {
        res.send(err);
    });
};

exports.createImage = (req, res) => {
    const { filename } = req.file;
    const { title, source } = req.body;
    cloudinary.uploader.upload(`public/uploads/${filename}`, result => {
        const imagePath = result.url;
        const userImage = {
            title: title,
            source: source,
            path: imagePath
        };
        db.Image.create(userImage)
        .then(image => {
            res.json(image);
        })
        .catch(err => {
            res.send(err);
        });
    });
}