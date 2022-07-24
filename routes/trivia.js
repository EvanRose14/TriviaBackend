const express = require('express');

const router = express.Router();

const triviaController = require('../controllers/trivia');

router.get('/question', [], triviaController.get_question);
router.get('/token', [], triviaController.get_otdb_token);

module.exports = router;