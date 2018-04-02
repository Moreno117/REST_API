var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var imageSchema = new mongoose.Schema({
    title: String,
    source: String,
    path: String,
    create_date:{
        type: Date,
        default: Date.now
    }
});

imageSchema.plugin(mongoosePaginate);

var Image = mongoose.model("Image", imageSchema);

module.exports = Image;