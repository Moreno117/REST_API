var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    subject: String,
    image: String,
    content: String,
    resume: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

postSchema.plugin(mongoosePaginate);

var Post = mongoose.model("Post", postSchema);

module.exports = Post;