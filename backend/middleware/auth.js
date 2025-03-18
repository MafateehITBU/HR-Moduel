const jwt = require('jsonwebtoken');

const auth = {
  checkAuth: (req, res, next) => {
    // Add authentication logic here
    // For example: verify JWT token
    next();
  },

  employeeAuth: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = user;
      next();
    });
  },
};

module.exports = auth; 