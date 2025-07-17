const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');//req bcz token coming from frontend in 2nd time

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to the request object
    

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    
    // If there is no user or the user's role is not allowed
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message:'you are not allowed to access this page' });
    }
    
    //   .includes() is the method in js to check if this values exists in the array or not return true or false

    // If the role is allowed, continue to the next middleware or route
    next();
  };
};

module.exports = { verifyToken, authorizeRoles }; 