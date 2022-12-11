require('dotenv').config({ path: `${__dirname}/.env` });
const Notification = require('../models/notification'),
      User         = require('../models/user'),
      sgMail       = require('../config/emailboxConfig'),
      EMAIL        = process.env.PUBLIC_EMAIL;


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

        const notification = await Notification.create({
            content,
            from: {
                userId: from._id,
                name: from.name,
                phone: from.phone,
                email: from.email
            },
            to: {
                userId: to._id,
                name: to.name,
                email: to.email
            }
        });

        const msg = {
            to: to.email,
            from: EMAIL,
            subject: '(no-reply) Notifications from Rentals.com',
            text: 'and easy to do anywhere, even with Node.js',
            html: `
                <strong>${from.name} expressed interest in your posted property!</strong>
                <hr>
                <div>Messages from ${from.name}: ${content}</div>
                <hr>
                <div>Please directly contact the potential tenant by the below-provided information.</div>
                <hr>
                <div>Best,<br> ${from.name}</div>
                <div>Phone: ${from.phone}</div>
                <div>Email: ${from.email}</div>
                <div>Date: ${notification.timestamp}</div>
            `,
        }

        const result = await sgMail.send(msg);

        console.log(result)

        await notification.updateOne({ status: true });

        return res.status(200).json({ message: 'Your questions have been sent' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Your questions failed to sent' });
    }
}

module.exports = {
    send
};