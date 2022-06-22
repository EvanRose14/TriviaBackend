const express = require('express');

var cookies = require("cookie-parser");

require("dotenv").config();

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const usersRoutes = require('./routes/users');

const errorController = require('./controllers/error')

const app = express();

app.use(cookies());

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/users', usersRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(port, () => console.log(`listening on port ${port}`));