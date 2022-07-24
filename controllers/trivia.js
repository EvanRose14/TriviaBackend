const OpenTDB = require('../models/opentdb');


exports.get_question = async (req, res, next) => {
    try {
        const question = await OpenTDB.getQuestion();
        console.log(question);
        res.json(question);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}

exports.get_otdb_token = async (req, res, next) => {
    try {
        const token = await OpenTDB.getSessionToken();
        console.log(token);
        res.json(token);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
}