require('dotenv').config({ path: `${__dirname}/.env` });
const jwt = require('jsonwebtoken');


/**
 * Take payload to assign a token.
 * 
 * @param {string} userId userId
 * @param {string} email the user email
 * @returns {string} jwt token
 */
const signToken = (userId, email) => {
    const token = jwt.sign(
        { id: userId, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: '1d'
        }
    );
    return token;
}


module.exports = { signToken };