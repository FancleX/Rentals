const express        = require('express'),
      userController = require('../controllers/userController'),
      auth           = require('../utils/auth');

const router = express.Router();

/**
 * @route /api/user/signup
 * @type Post
 * @jsonIn {name, email, phone, password}
 * @jsonOut {token, id, avatar, email, name, phone, saves(only id)}
 * @desc user signup
 * @access public
 */
router.post('/signup', userController.signup);

/**
 * @route /api/user/signin
 * @type Post
 * @jsonIn {email, password}
 * @jsonOut {token, id, avatar, email, name, phone, saves(only id), searchHistory}
 * @desc user signin
 * @access public
 */
router.post('/signin', userController.signin);


/**
 * @route /api/user/fetch/:id
 * @type Get
 * @jsonIn {id}
 * @jsonOut {avatar, email, name, phone, verified, officeTime}
 * @desc get user by id
 * @access private
 */
router.get('/fetch/:id', auth, userController.getUserById);

/**
 * @route /api/user/getsaves
 * @type Get
 * @jsonIn {}
 * @jsonOut {saves}
 * @desc get user save list
 * @access private
 */
router.get('/getsaves', auth, userController.getUserSaveList);

/**
 * @route /api/user/update/avatar
 * @type Put
 * @jsonIn {avatar}
 * @jsonOut {message}
 * @desc update user avatar
 * @access private
 */
router.put('/update/avatar', auth, userController.updateUserAvatar);

/**
 * @route /api/user/update/name
 * @type Put
 * @jsonIn {name}
 * @jsonOut {message}
 * @desc update user name
 * @access private
 */
router.put('/update/name', auth, userController.updateUserName);

/**
 * @route /api/user/update/phone
 * @type Put
 * @jsonIn {phone}
 * @jsonOut {message}
 * @desc update user phone number
 * @access private
 */
router.put('/update/phone', auth, userController.updateUserPhoneNumber);

/**
 * @route /api/user/update/password
 * @type Put
 * @jsonIn {oldPassword, newPassword}
 * @jsonOut {message}
 * @desc update user password
 * @access private
 */
router.put('/update/password', auth, userController.updateUserPassword);

/**
 * @route /api/user/update/saves/add
 * @type Put
 * @jsonIn {propertyId}
 * @jsonOut {message}
 * @desc add a property to user save list
 * @access private
 */
router.put('/update/saves/add', auth, userController.addToSaveList);

/**
 * @route /api/user/update/saves/delete
 * @type Delete
 * @jsonIn {propertyId}
 * @jsonOut {message}
 * @desc delete a property in user save list
 * @access private
 */
router.delete('/update/saves/delete', auth, userController.deletePropertyInSaveList);

/**
 * @route /api/user/update/posts
 * @type Put
 * @jsonIn {propertyId}
 * @jsonOut {message}
 * @desc add a property to user post list
 * @access private
 */
router.put('/update/posts', auth, userController.addToPostList);

/**
 * @route /api/user/delete/account
 * @type Delete
 * @jsonIn {}
 * @jsonOut {message}
 * @desc delete user account
 * @access private
 */
router.delete('/delete/account', auth, userController.deleteUserAccount);

module.exports = router;