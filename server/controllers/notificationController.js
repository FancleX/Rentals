const Notification = require('../models/notification'),
      User         = require('../models/user'),
      sgMail       = require('../config/emailboxConfig');

const send = async (req, res) => {
    try {
        const { content, receiverId } = req.body;
        const { id } = req.payload;

        const to = await User.findById(receiverId, [
            '_id',
            'name',
            'email'
        ]);
        if (!to) {
            return res.status(400).json({ message: 'Receiver not found or account inactive' });
        }

        const from = await User.findById(id, [
            '_id',
            'name',
            'phone',
            'email'
        ]);

        const msg = {
            to: to.email, // Change to your recipient
            from: email, // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          }


        return res.status(200).json({ message: 'Your questions have been sent' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    send
};