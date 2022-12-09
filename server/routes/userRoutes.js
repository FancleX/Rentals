const express        = require('express'),
      userController = require('../controllers/userController'),
      auth           = require('../utils/auth');

const router = express.Router();

/**
 * @route /api/user/signup
 * @type Post
 * @json {name, email, phone, password}
 * @desc user signup
 * @access public
 */
router.post('/signup', userController.signup);

/**
 * @route /api/user/signin
 * @type Post
 * @json {email, password}
 * @desc user signin
 * @access public
 */
router.post('/signin', userController.signin);


/**
 * @route /api/user/get/:id
 * @type Get
 * @json {id}
 * @desc get user by id
 * @access private
 */
router.get('/get/:id', auth, userController.getUserById);

/**
 * @route /api/user/update/avatar
 * @type Put
 * @json {avatar}
 * @desc update user avatar
 * @access private
 */
router.put('/update/avatar', auth, userController.updateUserAvatar);

/**
 * @route /api/user/update/name
 * @type Put
 * @json {name}
 * @desc update user name
 * @access private
 */
router.put('/update/name', auth, userController.updateUserName);

/**
 * @route /api/user/update/phone
 * @type Put
 * @json {phone}
 * @desc update user phone number
 * @access private
 */
router.put('/update/phone', auth, userController.updateUserPhoneNumber);

/**
 * @route /api/user/update/password
 * @type Put
 * @json {oldPassword, newPassword}
 * @desc update user password
 * @access private
 */
router.put('./update/password', auth, userController.updateUserPassword);

/**
 * @route /api/user/update/save/add
 * @type Put
 * @json {propertyId}
 * @desc add a property to user save list
 * @access private
 */
router.put('/update/save/add', auth, userController.addToSaveList);

/**
 * @route /api/user/update/save/delete
 * @type Delete
 * @json {propertyId}
 * @desc delete a property in user save list
 * @access private
 */
router.delete('/update/save/delete', auth, userController.deletePropertyInSaveList);

/**
 * @route /api/user/update/post
 * @type Put
 * @json {propertyId}
 * @desc add a property to user post list
 * @access private
 */
router.put('/update/post', auth, userController.addToPostList);

/**
 * @route /api/user/delete/account
 * @type Delete
 * @json {id}
 * @desc delete user account
 * @access private
 */
router.delete('/delete/account', auth, userController.deleteUserAccount);

module.exports = router;