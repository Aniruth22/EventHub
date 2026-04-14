// This middleware assumes it runs AFTER the authMiddleware

const checkRole = (roles) => (req, res, next) => {
  // Check if req.user was attached by the authMiddleware
  if (!req.user || !req.user.role) {
    return res.status(401).json({ msg: 'Authorization denied, user data missing.' });
  }
  
  // 'roles' will be an array like ['admin'] or ['host', 'admin']
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Forbidden: You do not have the required permissions.' });
  }
  next();
};

module.exports = checkRole;