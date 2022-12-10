const mongoose = require('mongoose'),
      dayjs    = require('dayjs');

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    from: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    to: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    timestamp: {
        type: String,
        default: dayjs().format('YYYY-MM-DD')
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);