const Router = require('express').Router;
const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/auth');

module.exports = (app) => {
    const router = Router();

    router.post('/register', isNotAuthenticated, register);
    router.post('/login', isNotAuthenticated, login);
    router.post('/logout', isAuthenticated, logout);

    app.use('/api/auth', router);
}