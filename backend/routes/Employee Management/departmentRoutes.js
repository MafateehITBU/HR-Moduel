const express = require('express');
const router = express.Router();
const departmentController = require('../../controllers/Employee Management/departmentController');

router.post('/', departmentController.createDepartment); // create new department
router.get('/', departmentController.getAllDepartments); // get all departments
router.get('/:id', departmentController.getDepartmentById); // get department by ID
router.put('/:id', departmentController.updateDepartmentById); // update department
router.delete('/:id', departmentController.deleteDepartment); // delete department

module.exports = router;