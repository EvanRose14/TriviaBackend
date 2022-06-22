const express = require('express');

const router = express.Router();

// const User = require('../models/user');

const Auth = require('../middleware/authorization');

const usersController = require('../controllers/users');

router.get('', Auth.authenticateToken, usersController.getusers);

module.exports = router;