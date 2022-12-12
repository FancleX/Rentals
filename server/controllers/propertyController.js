const Property = require('../models/property'),
      User     = require('../models/user');


const getProperty = async (req, res) => {
    try {
        const property = await Property.find().limit(10);

        return res.status(200).json({ data: property });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findById(id).populate('contact.id', {
            '_id': 1,
            'avatart': 1,
            'name': 1,
            'phone': 1,
            'email': 1,
            'officeTime': 1,
            'verified': 1
        });

        return res.status(200).json({ data: property });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const search = async (req, res) => {
    try {
        const { location: { lng, lat }, range } = req.body;

        // convert mile to kilometer
        const distance = Math.round((1.6 * range) / 2),
              earthRad = 6371,
              dlng     = 2 * Math.asin(Math.sin(distance / (2 * earthRad)) / Math.cos(lat*Math.PI/180)) * 180 / Math.PI,
              dlat     = (distance / earthRad) * 180 / Math.PI;

        const minLat = lat - dlat,
              maxLat = lat + dlat,
              minLng = lng - dlng,
              maxLng = lng + dlng;

        const properties = await Property.find({
            "location.longitude": {
                $gte: minLng,
                $lte: maxLng
            },
            "location.latitude": {
                $gte: minLat,
                $lte: maxLat 
            }
        },{
            '_id': 1,
            'img': {
                $first: '$img'
            },
            'location': 1,
            'entity': 1,
            'source': 1
        }).limit(30);

        return res.status(200).json({ data: properties });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const create = async (req, res, next) => {
    try {
        const { 
            img, 
            video, 
            location, 
            entity, 
            policies,
            utilities, 
            source,
            description
        } = req.body;

        const { id } = req.payload;

        const { longitude, latitude } = location;

        const property = await Property.findOne({
            "location.longitude": {
                $eq: longitude
            },
            "location.latitude": {
                $eq: latitude
            }
        });

        if (property) {
            return res.status(409).json({ message: 'The property has been posted' });
        }

        const newProperty = await Property.create({
            img, 
            video, 
            location, 
            entity, 
            policies, 
            utilities,
            contact: { id },
            source,
            description
        });

        await User.findByIdAndUpdate(id, {
            $push: {
                posts: {
                    $each: [newProperty._id]
                }
            }
        });

        return res.status(200).json({ message: 'Thanks for your post' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getProperty,
    getDetail,
    search,
    create
};