const User       = require('../models/user'),
      authHelper = require('../utils/authHelper'),
      bcrypt     = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const isExisted = await User.findOne({ email });
        if (isExisted) {
            return res.status(400).json({ message: 'The account has been registered, please login' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: encryptedPassword,
            verified: true
        });

        const token = authHelper.signToken(user._id, email);

        const data = {
            token,
            id: user._id,
            avatar: user.avatar,
            email: user.email,
            phone: user.phone,
            saves: user.saves,
            name: user.name
        };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // renew token
            const token = authHelper.signToken(user._id, email);

            const data = {
                token,
                id: user._id,
                avatar: user.avatar,
                email: user.email,
                phone: user.phone,
                name: user.name,
                saves: user.saves,
                searchHistory: user.searchHistory
            };

            return res.status(200).json({ data });
        }
        return res.status(400).json({ message: 'Incorrect email address or password' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const signinWithToken = async (req, res) => {
    try {
        const { id, email } = req.payload;

        const user = await User.findById(id);

        const token = authHelper.signToken(user._id, email);

        const data = {
            token,
            id: user._id,
            avatar: user.avatar,
            email: user.email,
            name: user.name,
            phone: user.phone,
            saves: user.saves,
            searchHistory: user.searchHistory
        };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id, [
            'avatar',
            'email',
            'name',
            'phone',
            'verified',
            'officeTime'
        ]);

        if (!user) {
            return res.status(404).json({ message: 'The user is not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getUserSaveList = async (req, res) => {
    try {
        const { id } = req.payload;

        const user = await User.findById(id).populate('saves', {
            '_id': 1,
            'img': {
                $first: '$img'
            },
            'location': 1,
            'entity': 1,
            'source': 1
        });

        const data = { saves: user.saves };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getUserSaveListIds = async (req, res) => {
    try {
        const { id } = req.payload;

        const user = await User.findById(id);

        const data = { saves: user.saves };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUserSearchHistory = async (req, res) => {
    try {
        const { id } = req.payload;
        const { history } = req.body;

        await User.findByIdAndUpdate(id, {
            $addToSet: {
                searchHistory: history
            },
            upsert: true
        });

        await User.findByIdAndUpdate(id, {
            $push: {
                searchHistory: {
                    $each: [],
                    $slice: -5
                }
            }
        });

        const data = await User.findById(id, 'searchHistory');

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUserAvatar = async (req, res) => {
    try {
        const { payload: { id }, body: { avatar } } = req;

        await User.findByIdAndUpdate(id, { avatar });

        const data = { avatar };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUserName = async (req, res) => {
    try {
        const { payload: { id }, body: { name } } = req;

        await User.findByIdAndUpdate(id, { name });

        const data = { name };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUserPhoneNumber = async (req, res) => {
    try {
        const { payload: { id }, body: { phone } } = req;

        await User.findByIdAndUpdate(id, { phone });

        const data = { phone };

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const { payload: { id }, body: { oldPassword, newPassword } } = req;
        const user = await User.findById(id);

        if (!await bcrypt.compare(oldPassword, user.password)) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await user.updateOne({ password: encryptedPassword });

        return res.status(200).json({ message: 'Successfully updated' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const addToSaveList = async (req, res) => {
    try {
        const { payload: { id }, body: { propertyId } } = req;

        await User.findByIdAndUpdate(id, {
            $push: {
                saves: {
                    $each: [propertyId]
                }
            }
        });

        return res.status(200).json({ message: 'Added to your save list' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deletePropertyInSaveList = async (req, res) => {
    try {
        const { payload: { id }, body: { propertyId } } = req;
        
        await User.findByIdAndUpdate(id, {
            $pull: {
                saves: propertyId
            }
        });

        return res.status(200).json({ message: 'Deleted from your save list' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteUserAccount = async (req, res) => {
    try {
        const { payload: { id } } = req;

        await User.findByIdAndRemove(id);

        return res.status(200).json({ message: 'Your account has been deactivated' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    signup,
    signin,
    signinWithToken,
    getUserById,
    getUserSaveList,
    getUserSaveListIds,
    updateUserSearchHistory,
    updateUserAvatar,
    updateUserName,
    updateUserPhoneNumber,
    updateUserPassword,
    addToSaveList,
    deletePropertyInSaveList,
    deleteUserAccount
}