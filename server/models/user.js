const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: ''
        },
        officeTime: {
            type: String,
            default: 'Mon - Fri, 9am to 5pm'
        },
        verified: {
            type: Boolean,
            default: false
        },
        saves: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property'
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property'
            }
        ],
        searchHistory: [
            {
                type: String
            }
        ]
    }
);

module.exports = mongoose.model('User', UserSchema);