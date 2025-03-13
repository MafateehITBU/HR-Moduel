const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./Employee Management/employeeRoutes');
const departmentRoutes = require('./Employee Management/departmentRoutes');
const jobTitleRoutes = require('./Employee Management/jobtTitleRoutes');
const teamRoutes = require('./Employee Management/teamRoutes');

// Use routes
router.use('/users', userRoutes);
router.use('/employee', employeeRoutes);
router.use('/department', departmentRoutes);
router.use('/jobTitle', jobTitleRoutes);
router.use('/team', teamRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

module.exports = router; 