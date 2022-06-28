const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = class Auth {
    static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']; // bearer token

        const token = authHeader && authHeader.split(' ')[1];

        if(token === null) return res.status(401).json({ message: 'NULL token' });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if(error) return res.status(403).json({ message: error.message });
            req.user = user;
            next();
        })
    }
}