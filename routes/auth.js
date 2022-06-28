const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post('/signup',
    [
        body('name').trim().not().isEmpty().withMessage('Username required').custom(async (username) => {
            const user = await User.findByUsername(username)
            if(user.rowCount > 0) {
                return Promise.reject('Username taken')
            }
        }),
        body('email').isEmail().withMessage('Invalid email')
        .custom(async (email) => {
            const user = await User.findByEmail(email)
            if(user.rowCount > 0) {
                return Promise.reject('Email taken')
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7 }).withMessage('Password must be at least 7 characters')
    ], 
    authController.signup
);

router.post('/login', 
    [],
    authController.login
);


router.get('/refresh_token',
    [],
    authController.refresh_token
);

router.delete('/refresh_token',
    [],
    authController.delete_token
);

module.exports = router;