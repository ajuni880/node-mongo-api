const mongoose = require('mongoose');

const handleError = (err, res) => {
    console.log(err, err.__proto__);
    if (!err) return;

    if (err instanceof mongoose.Error.ValidationError) {
        const fields = Object.keys(err.errors);
        const errors = fields.map((field) => {
            const error = err.errors[field];
            return { field, message: `${field} is ${error.kind}`, value: error.value || 'undefined'}
        });
        return res.status(400).json(errors);
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            field,
            message: 'Email already exists',
            value: err.keyValue[field]
        });
    }

    if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(500).json(err);
}

module.exports = (err, req, res, next) => {
    handleError(err, res);
}