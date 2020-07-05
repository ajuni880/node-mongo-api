const { Schema, model } = require('mongoose');
const crypto = require('crypto');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        max: 36,
        trim: true
    },
    email: {
        type: String,
        unique: 'Email already exists',
        required: true,
        index: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.hashPassword(password);
    })
    .get(function(value, virtual, doc) {
        return this._password;
    });

userSchema.methods = {
    authenticate(password) {
        return this.hashPassword(password) === this.hashedPassword;
    },
    hashPassword(password) {
        if (!password) return;
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return '';
        }
    },
    makeSalt: function(password) {
        return `${Math.round(new Date().valueOf() * Math.random())}`;
    }
}

module.exports = model('User', userSchema);