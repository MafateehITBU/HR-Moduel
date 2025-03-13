const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/Employee Management/employeeController');


router.post('/', employeeController.createEmployee); // Create employee
router.get('/', employeeController.getAllEmployees); // Get all employees
router.get('/:id', employeeController.getEmployeeById); // Get employee by ID
router.put('/:id', employeeController.updateEmployee); // Update employee by ID
router.delete('/:id', employeeController.deleteEmployee); // Delete employee by ID
router.post('/signin', employeeController.signin); // signin

module.exports = router;