const Property = require('../models/property');

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

        const property = await Property.findById(id);

        return res.status(200).json({ data: property });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const search = async (req, res) => {
    try {
        const { location: { lng, lat }, range } = req.body;

        const distance = Math.round(range / 2),
              earthRad = 6371,
              dlng     = 2 * Math.asin(Math.sin(distance / (2 * earthRad)) / Math.cos(lat * Math.PI / 100)) * 180 / Math.PI,
              dlat     = (distance / earthRad) * 180 / Math.PI;

        const minLat = lat - dlat,
              maxLat = lat + dlat,
              minLng = lng - dlng,
              maxLng = lng + dlng;

        const properties = await Property.find({
            location: {
                longitude: {
                    $gte: minLng,
                    $lte: maxLng 
                },
                latitude: {
                    $gte: minLat,
                    $lte: maxLat
                }
            }
        });

        return res.status(200).json({ data: properties });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const { 
            img, 
            video, 
            location, 
            entity, 
            policies, 
            contact,
            source,
            description
        } = req.body;

        await Property.create({
            img, 
            video, 
            location, 
            entity, 
            policies, 
            contact,
            source,
            description
        });

        return res.status(200).json({ message: 'Successfully uploaded'});
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