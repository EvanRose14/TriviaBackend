const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post('/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Must be a valid email.')
        .custom(async (email) => {
            const user = await User.find(email)
            if(user.rowCount > 0) {
                return Promise.reject('Email address is already being used.')
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7 }).withMessage('Password must be at least 7 characters.')
    ], 
    authController.signup
);

router.post('/login', 
    [

    ],
    authController.login
);

module.exports = router;