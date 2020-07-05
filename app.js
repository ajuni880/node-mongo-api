const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const errorHandler = require('./helpers/errorHandler');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60
    })
}));

require('./routes/auth')(app);
require('./routes/products')(app);
require('./routes/categories')(app);

app.use(errorHandler);

module.exports = app;