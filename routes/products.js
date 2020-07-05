const Router = require('express').Router;
const { isAuthenticated } = require('../middlewares/auth');
const { upload, resize } = require('../middlewares/upload');
const { create, get, getAll, update, remove } = require('../controllers/products');

module.exports = (app) => {
    const router = Router();

    router.use(isAuthenticated);

    router.get('/', getAll);
    router.get('/:id', get);
    router.post('/', upload, resize, create, get);
    router.put('/:id', upload, resize, update, get);
    router.delete('/:id', remove);

    app.use('/api/products', router);
}