
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(403).json({ message: 'No token provided' });
  
    if (blacklistedTokens.includes(token)) {
      return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      req.user = decoded;
      next();
    });
  };