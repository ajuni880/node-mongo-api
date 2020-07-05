const slugify = require('slugify');
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    meta: {
        title:{
            type: String,
        },
        description: {
            type: String
        }
    },
    photos: [String],
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    }],
}, { timestamps: true });

module.exports = model('Product', productSchema);