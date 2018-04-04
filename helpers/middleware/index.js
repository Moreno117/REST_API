module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send({ message: 'User no Authenticated', code: 401 });
}