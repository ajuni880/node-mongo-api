const Router = require('express').Router;
const { isAuthenticated } = require('../middlewares/auth');
const { create, get, getAll, remove } = require('../controllers/categories');

module.exports = (app) => {
    const router = Router();

    router.use(isAuthenticated);

    router.get('/', getAll);
    router.get('/:id', get);
    router.post('/', create);
    router.delete('/:id', remove);

    app.use('/api/categories', router);
}