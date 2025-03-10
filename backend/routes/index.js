const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Use routes
router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

module.exports = router; 