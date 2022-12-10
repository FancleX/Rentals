const express        = require('express'),
      notificationController = require('../controllers/notificationController'),
      auth           = require('../utils/auth');

const router = express.Router();

/**
 * @route /api/notification/send
 * @type Post
 * @jsonIn {content, receiverId}
 * @jsonOut {message}
 * @desc send notification from a user to another user
 * @access private
 */
router.post('/notification/send', auth, notificationController.send);

module.exports = router;