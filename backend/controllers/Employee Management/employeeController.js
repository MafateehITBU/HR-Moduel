const Employee = require('../../models/Employee Management/Employee');
const helpers = require('../../utils/helpers');

const employeeController = {
    // Create a new employee
    createEmployee: async (req, res) => {
        try {
            const { name, email, password, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID } = req.body;

            // Validate the email using the helper function
            if (!helpers.validateEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Validate the phone using the helper function
            if (!helpers.validatePhone(phone)) {
                return res.status(400).json({ error: 'Invalid phone number format' });
            }

            // Validate the password using the helper function
            if (!helpers.validatePassword(password)) {
                return res.status(400).json({ error: 'Password must be at least 8 characters' });
            }

            // Validate the date of birth (should be 18 or older)
            if (!helpers.validateDOB(dob)) {
                return res.status(400).json({ error: 'Employee must be 18 years or older.' });
            }

            const newEmployee = await Employee.createEmployee(name, email, password, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID);

            res.status(201).json({
                message: 'Employee created successfully',
                newEmployee
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get all employees
    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.getAllEmployees();
            res.status(200).json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get employee by ID
    getEmployeeById: async (req, res) => {
        try {
            const id = req.params.id;
            const employee = await Employee.getEmployeeById(id);
            if (!employee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update employee
    updateEmployee: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, email, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID } = req.body;

            // Check if no fields are provided for update
            if (!name && !email && !phone && !dob && !hireDate && bankDetails === undefined && !depID && !jobTitleID && !teamID) {
                return res.status(400).json({ error: 'No fields to update' });
            }

            const updatedEmployee = await Employee.updateEmployee(id, name, email, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID);
            if (!updatedEmployee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            res.status(200).json({
                message: "Employee updated successfully",
                updatedEmployee
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Delete employee
    deleteEmployee: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedEmployee = await Employee.deleteEmployee(id);
            if (!deletedEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json({ message: "Employee deleted successfully!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Signin
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const { employee, token } = await Employee.signin(email, password);
            res.status(200).json({ employee, token });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
};

module.exports = employeeController;
