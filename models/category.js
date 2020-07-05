const slugify = require('slugify');
const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        default: function() {
            return slugify(this.name)
        }
    }
}, { timestamps: true });

module.exports = model('Category', categorySchema);