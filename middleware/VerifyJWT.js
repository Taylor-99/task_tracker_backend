const jwt = require('jsonwebtoken');
const db = require('../models'); // adjust path as needed

const verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header (format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Verify token = ', token);

    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Look up the user from the decoded token
    const user = await db.User.findById(decoded.id); // use `id`, not `userID`

    if (!user) {
      return res.status(401).json({ message: 'Invalid Token: User not found' });
    }

    // Attach user to request
    req.user = user;

    // Continue to next middleware or route
    next();

  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

module.exports = verifyToken;
