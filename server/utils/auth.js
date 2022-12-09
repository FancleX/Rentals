const jwt = require("jsonwebtoken");
require('dotenv').config({ path: `${__dirname}/.env` });

const key = process.env.PASSWORD_SALT;

/**
 * Verify user token and store the playload in req.playload.
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, key);
    req.playload = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;