const Product = require('../models/product');
const stripHtml = require('string-strip-html');
const slugify = require('slugify');

const createMetaFields = ({ name, description }) => ({
    title: name,
    description: stripHtml(description.substring(0, 160))
});

exports.create = (req, res, next) => {
    const { name, description, categories, photos, price } = req.body;
    const meta = createMetaFields(req.body);
    const slug = slugify(name);
    const product = new Product({ name, description, slug, categories, photos, meta, price });
    product.save()
        .then(prod => {
            req.params.id = prod._id;
            next();
        })
        .catch(next);
}

exports.update = (req, res, next) => {
    const { id }  = req.params;

    let { name, description, categories = [], photos = [] } = req.body;
    const slug = slugify(name);

    if (typeof categories === 'string' && categories) {
        categories = JSON.parse(categories);
    }

    const meta = createMetaFields(req.body);

    Product.findById(id).exec()
        .then(prod => {
            prod.categories = categories
            prod.photos.push(...photos);
            return prod.save({ name, description, meta, slug })
        })
        .then(prod => {
            req.params.id = prod._id;
            next();
        })
        .catch(next);
}

exports.get = (req, res, next) => {
    const { id } = req.params;
    Product.findById(id).populate('categories').exec()
        .then(prod => res.json(prod))
        .catch(next);
}

exports.getAll = (req, res, next) => {
    Product.find({}).populate('categories').exec()
        .then(prods => res.json(prods))
        .catch(next);
}

exports.remove = (req, res, next) => {
    const { id } = req.params;
    Product.findOneAndDelete(id).exec()
        .then(prod => res.json(prod))
        .catch(next);
}
