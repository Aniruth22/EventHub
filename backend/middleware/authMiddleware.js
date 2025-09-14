const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get the token from the request header
  const authHeader = req.header('Authorization');

  // Check if there's no header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No authorization header, access denied' });
  }

  // Check if the header is correctly formatted: "Bearer <token>"
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token is malformed, access denied' });
  }
  
  const token = tokenParts[1];

  // Check if there's a token after "Bearer "
  if (!token) {
    return res.status(401).json({ msg: 'No token found after Bearer, access denied' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's payload (which includes their ID and role) to the request object
    req.user = decoded.user;
    
    // Proceed to the next middleware or the route handler
    next();
  } catch (err) {
    // This will catch invalid or expired tokens
    res.status(401).json({ msg: 'Token is not valid' });
  }
};