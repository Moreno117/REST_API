const mongoose = require("mongoose");

mongoose.set('debug', true);

var url = process.env.DATABASEURL || "mongodb://localhost:27017/node-blog";

mongoose.connect(url);

mongoose.Promise = Promise;

module.exports.Post = require("./data/post");
module.exports.User = require("./data/user");
module.exports.Image = require("./data/image");