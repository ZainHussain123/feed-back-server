// src\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (role) => (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded.user;

    if (role && req.user.role !== role) {
      return res.status(403).json({ msg: 'Permission denied' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
