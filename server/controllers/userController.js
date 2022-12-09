const User       = require('../models/user'),
      authHelper = require('../utils/authHelper'),
      bcrypt     = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!(name && email && phone && password)) {
            res.status(400).json({ message : 'Missing input' });
        }

        const isExisted = await User.findOne({ email });
        if (isExisted) {
            res.status(400).json({ message: 'The account has been registered, please login' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: encryptedPassword,
            verified: true
        });

        const token = authHelper.encrypt(user._id, email);
        user.token = token;

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const signin = async (req, res) => {
    
}

const getUserById = async (req, res) => {
    
}

const updateUserAvatar = async(req, res) => {

}

const updateUserName = async(req, res) => {

}

const updateUserPhoneNumber = async(req, res) => {

}

const updateUserPassword = async(req, res) => {

}

const addToSaveList = async(req, res) => {

}

const deletePropertyInSaveList = async(req, res) => {

}

const addToPostList = async(req, res) => {

}

const deleteUserAccount = async(req, res) => {

}

module.exports = {
    signup,
    signin,
    getUserById,
    updateUserAvatar,
    updateUserName,
    updateUserPhoneNumber,
    updateUserPassword,
    addToSaveList,
    deletePropertyInSaveList,
    addToPostList,
    deleteUserAccount
}