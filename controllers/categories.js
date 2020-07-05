const Category = require('../models/category');

exports.create = (req, res, next) => {
    const { name } = req.body;

    new Category({ name }).save()
        .then(cat => res.json(cat))
        .catch(next)
}

exports.get = (req, res, next) => {
    const { id } = req.params;

    Category.findById(id).exec()
        .then(cat => res.json(cat))
        .catch(next)
}

exports.getAll = (req, res, next) => {
    Category.find({}).exec()
        .then(cat => res.json(cat))
        .catch(next)
}

exports.remove = (req, res, next) => {
    const { id } = req.params;

    Category.findOneAndDelete({ _id: id }).exec()
        .then(cat => res.json())
        .catch(next)
}
