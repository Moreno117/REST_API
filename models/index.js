const mongoose = require("mongoose");
const Axios = require("axios");

mongoose.set('debug', true);

var url = process.env.DATABASEURL || "mongodb://localhost:27017/node-blog";

mongoose.connect(url);

mongoose.Promise = Axios;

module.exports.Post = require("./data/post");
module.exports.User = require("./data/user");