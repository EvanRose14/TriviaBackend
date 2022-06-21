const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const WebTokens = require('../util/webtokens');


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        next(new Error(errors.errors[0].msg));
        return
    }
    
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }

        await User.save(userDetails);

        res.status(201).json({ message: 'Sign up successful' });
    } 
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}


exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.find(email);

        if(user.rowCount === 0) {
            return res.status(401).json({ message: 'Email not found.' });
        }

        const passwordMatched = await bcrypt.compare(password, user.rows[0].password);

        if(!passwordMatched) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        const tokens = WebTokens.jwtTokens(user.rows[0]);

        res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});

        res.json(tokens);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}
