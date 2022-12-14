const mongoose = require('mongoose'),
    dayjs = require('dayjs');

const PropertySchema = new mongoose.Schema({
    img: [
        {
            type: String,
            required: true
        }
    ],
    video: [
        {
            type: String
        }
    ],
    location: {
        communityName: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    entity: {
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        beds: {
            type: Number,
            required: true
        },
        baths: {
            type: Number,
            required: true
        },
        area: {
            type: Number,
        },
        yearBuilt: {
            type: Number,
        }
    },
    policies: {
        deposit: {
            type: Number,
            required: true
        },
        securityFee: {
            type: Number,
            required: true
        },
        leaseTerm: {
            type: Number,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        }
    },
    utilities: {
        pet: {
            type: Boolean,
            required: true
        },
        heating: {
            type: Boolean,
            required: true
        },
        cooling: {
            type: Boolean,
            required: true
        },
        laundry: {
            type: Boolean,
            required: true
        },
        furnished: {
            type: Boolean,
            required: true
        },
        parking: {
            type: String,
            required: true
        },
    },
    contact: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    source: {
        inNetwork: {
            type: Boolean,
            default: false
        }
    },
    description: {
        rentDescription: {
            type: String,
            default: ''
        }
    },
    meta: {
        postDate: {
            type: String,
            default: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
    }

});

module.exports = mongoose.model('Property', PropertySchema);