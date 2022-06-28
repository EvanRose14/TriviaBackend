const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { jwtTokens } = require('../util/webtokens');

const { verify } = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // next(new Error(errors.errors[0].msg));
        return res.status(401).json({message: errors.errors[0].msg})
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
        const user = await User.findByEmail(email);

        if(user.rowCount === 0) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const passwordMatched = await bcrypt.compare(password, user.rows[0].password);

        if(!passwordMatched) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const tokens = jwtTokens(user.rows[0]);

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


exports.refresh_token = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        
        if(refreshToken === null) return res.status(401).json({ message: 'Null refresh token'});

        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {

            if(error) return res.status(403).json({ message: error.message});

            let tokens = jwtTokens(user);

            res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
            res.json(tokens);
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}

exports.delete_token = async (req, res, next) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message: 'Refresh token deleted'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err); 
    }
}
