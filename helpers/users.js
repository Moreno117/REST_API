const db = require('./../models');
const passport = require('passport');

exports.getUsers = (req,res) => {
    let { page, size } = req.query;
    if (page === undefined ||  size === undefined) page = 1, size = 9
    db.User.paginate({}, { page: Number(page), limit: Number(size) })
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.send(err);
    });
};

exports.createUser = (req, res) => {
    const newUser = new db.User({ username: req.body.username });
    db.User.register(newUser, req.body.password, (err, user) => {
        if (err){
            console.log("Error auth ", err);
            return res.send({error: err});
        } else {
            passport.authenticate("local")(req, res, () => {
                res.send({message: 'User create succesfully', code: 200});
            });
        };
    });
};