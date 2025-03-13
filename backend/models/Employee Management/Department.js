const pool = require('../../config/db');

class Department {
    // Create new Department
    static async createDepartment(name) {
        try {
            const query = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
            const result = await pool.query(query, [name]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Get All Departments
    static async getAllDepartments() {
        try {
            const query = 'SELECT * FROM departments';
            const { rows } = await pool.query(query);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // Get Department by ID
    static async getDepartmentById(id) {
        try {
            const query = 'SELECT * FROM departments WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Update Department by ID
    static async updateDepartmentById(id, name, departmentHeadID) {
        try {
            // Store the fields to update dynamically
            const updates = [];
            const values = [];
            let index = 1; // Placeholder index ($1, $2)

            if (name) {
                updates.push(`name = $${index}`);
                values.push(name);
                index++;
            }

            if (departmentHeadID) {
                updates.push(`departmentHeadID = $${index}`);
                values.push(departmentHeadID);
                index++;
            }

            // If no fields were provided, return an error
            if (updates.length === 0) {
                throw new Error("No fields provided for update");
            }

            // Construct the query dynamically
            const query = `UPDATE departments SET ${updates.join(", ")} WHERE id = $${index} RETURNING *`;
            values.push(id); // Add ID as the last parameter

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Delete Department by ID
    static async deleteDepartment(id) {
        try {
            const query = 'DELETE FROM departments WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rowCount > 0;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Department;
