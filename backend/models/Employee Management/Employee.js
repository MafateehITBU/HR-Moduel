const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Employee = {
    // Create a new employee
    createEmployee: async (name, email, password, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const query = `
                INSERT INTO employees (name, email, password_hash, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
            const result = await pool.query(query, [name, email, hashedPassword, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Get all employees
    getAllEmployees: async () => {
        try {
            const query = 'SELECT * FROM employees';
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            throw err;
        }
    },

    // Get employee by ID
    getEmployeeById: async (id) => {
        try {
            const query = 'SELECT * FROM employees WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Update employee information
    updateEmployee: async (id, name, email, phone, dob, hireDate, bankDetails, depID, jobTitleID, teamID) => {
        try {
            // Store the fields to update dynamically
            const updates = [];
            const values = [];
            let index = 1;

            // Add fields to the update query only if they are provided
            if (name) {
                updates.push(`name = $${index}`);
                values.push(name);
                index++;
            }

            if (email) {
                updates.push(`email = $${index}`);
                values.push(email);
                index++;
            }

            if (phone) {
                updates.push(`phone = $${index}`);
                values.push(phone);
                index++;
            }

            if (dob) {
                updates.push(`dob = $${index}`);
                values.push(dob);
                index++;
            }

            if (hireDate) {
                updates.push(`hireDate = $${index}`);
                values.push(hireDate);
                index++;
            }

            if (bankDetails !== undefined) {  // Allow 'null' for bankDetails
                updates.push(`bankDetails = $${index}`);
                values.push(bankDetails);
                index++;
            }

            if (depID) {
                updates.push(`depID = $${index}`);
                values.push(depID);
                index++;
            }

            if (jobTitleID) {
                updates.push(`jobTitleID = $${index}`);
                values.push(jobTitleID);
                index++;
            }

            if (teamID) {
                updates.push(`teamID = $${index}`);
                values.push(teamID);
                index++;
            }

            if (updates.length === 0) {
                throw new Error("No fields provided for update");
            }

            // Add the ID as the last parameter
            const query = `UPDATE employees SET ${updates.join(", ")} WHERE id = $${index} RETURNING *`;
            values.push(id);

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Delete employee by ID
    deleteEmployee: async (id) => {
        try {
            const query = 'DELETE FROM employees WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [id]);
            return result.rowCount > 0;
        } catch (err) {
            throw err;
        }
    },

    // Signin with JWT
    signin: async (email, password) => {
        try {
            const query = 'SELECT * FROM employees WHERE email = $1';
            const result = await pool.query(query, [email]);
            const employee = result.rows[0];
            if (!employee) {
                throw new Error('Employee not found');
            }
            const isMatch = await bcrypt.compare(password, employee.password_hash);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ id: employee.id, email: employee.email }, process.env.SECRET_KEY, { expiresIn: '10h' }); // JWT token
            return { employee, token };
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Employee;
