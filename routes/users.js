const express = require('express');

const router = express.Router();

const User = require('../models/user');

const usersController = require('../controllers/users');

router.get('', [], usersController.getusers);

module.exports = router;