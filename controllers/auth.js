const User = require('../models/user');
const formatUser = (user) => user.salt = user.hashedPassword = user.createdAt = user.updatedAt = undefined;

exports.register = (req, res, next) => {
    const { fullname, email, password } = req.body;
    new User({ fullname, email, password }).save()
        .then(user => {
            formatUser(user)
            res.json(user);
        })
        .catch(err => next(err));
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).exec()
        .then(user => {
            if (!user || !user.authenticate(password)) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }
            req.session.userId = user._id;
            formatUser(user);
            res.json(user);
        })
        .catch(err => next(err));
}


exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        res.json();
    });
}