const jwt = require("jsonwebtoken");
require('dotenv').config({ path: `${__dirname}/.env` });

const key = process.env.TOKEN_KEY;

/**
 * Verify user token and store the playload in req.payload.
 */
const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.auth;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, key);
    req.payload = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;