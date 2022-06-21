const User = require('../models/user');

exports.getusers = async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}