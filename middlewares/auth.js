const passport = require("passport");

module.exports = function isLoggedAndAuth(req,res, next) {
    passport.authenticate('bearer', function (err, user, info) {
        if(err){
            return next(err);
        }
        if(user){
            req.user = user;
            return next();
        } else {
            return res.status(401).json({status: 'error', code: 'unauthorized'});
        }
    })(req,res,next);
};