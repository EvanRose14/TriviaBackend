const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = class Auth {
    static authenticationToken(req, res, next) {
        const authHeader = req.headers['authorization']; // bearer token

        const token = authHeader && authHeader.split(' ')[1];

        if(token === null) return res.status(401).json({ error: 'NULL token.' });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if(error) return res.status(403).json({ error: error.message });
            req.user = user;
            next();
        })
    }
}