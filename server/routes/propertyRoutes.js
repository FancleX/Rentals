const express            = require('express'),
      propertyController = require('../controllers/propertyController'),
      auth               = require('../utils/auth');

const router = express.Router();

/**
 * @route /api/property/fetch
 * @type Get
 * @jsonIn {}
 * @jsonOut {property}
 * @desc get 10 preview properties
 * @access public
 */
router.get('/fetch', propertyController.getProperty);

/**
 * @route /api/property/getdetail/:id
 * @type Get
 * @jsonIn {id}
 * @jsonOut {property}
 * @desc get property details by id
 * @access private
 */
router.get('/getdetail/:id', auth, propertyController.getDetail);

/**
 * @route /api/property/search
 * @type Post
 * @jsonIn {location: {lng, lat}, range}
 * @jsonOut {properties}
 * @desc get preview properties based on the given location and within the range
 * @access public
 */
router.post('/search', propertyController.search);

/**
 * @route /api/property/create
 * @type Post
 * @jsonIn {img, video, location, entity, policies, contact, source, description}
 * @jsonOut {message}
 * @desc create a property
 * @access private
 */
router.post('/create', auth, propertyController.create);

module.exports = router;