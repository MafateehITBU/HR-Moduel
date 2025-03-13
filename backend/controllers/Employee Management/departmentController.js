const Department = require('../../models/Employee Management/Department');

const departmentController = {
    // Create new Department
    createDepartment: async (req, res) => {
        try {
            const name = req.body.name;
            const department = await Department.createDepartment(name);
            res.json(department);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get All Departments
    getAllDepartments: async (req, res) => {
        try {
            const departments = await Department.getAllDepartments();
            if (!departments) {
                res.status(404).json({ error: 'No departments found' });
            }
            res.json(departments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get Department by ID
    getDepartmentById: async (req, res) => {
        try {
            const id = req.params.id;
            const department = await Department.getDepartmentById(id);
            if (!department) {
                res.status(404).json({ error: 'Department not found' });
            }
            res.json(department);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update Department by ID
    updateDepartmentById: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, departmentHeadID } = req.body;

            if (!name && !departmentHeadID) {
                return res.status(400).json({ error: "No fields provided for update" });
            }

            const updatedDepartment = await Department.updateDepartmentById(id, name, departmentHeadID);

            if (!updatedDepartment) {
                return res.status(404).json({ error: "Couldn't update Department!" });
            }

            res.status(200).json({
                message: "Department updated successfully",
                updatedDepartment
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Delete Department by ID
    deleteDepartment: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedDepartment = await Department.deleteDepartment(id);
            if (!deletedDepartment) {
                return res.status(404).json({ error: "Department not found" });
            }
            res.status(200).json({ message: "Department deleted successfully!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = departmentController;