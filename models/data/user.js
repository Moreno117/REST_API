var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var mongoosePaginate = require("mongoose-paginate");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(mongoosePaginate);

var User = mongoose.model("User", UserSchema);

module.exports = User;