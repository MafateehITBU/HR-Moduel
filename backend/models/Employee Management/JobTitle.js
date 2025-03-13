const pool = require('../../config/db');

class JobTitle {
    // Create new Job title
    static async createJobTitle(jobTitle, description, depID) {
        try {
            const columns = ['jobTitle', 'description'];
            const values = [jobTitle, description];
            const placeholders = ['$1', '$2'];
            let index = 3; // Start at 3 if depID exists

            if (depID) {
                columns.push('depID');
                values.push(depID);
                placeholders.push(`$${index}`);
            }

            const query = `INSERT INTO jobTitles (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`;
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Get all Job titles
    static async getAllJobTitles() {
        try {
            const query = 'SELECT * FROM jobTitles';
            const { rows } = await pool.query(query);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // Get Job title by ID
    static async getJobTitleById(id) {
        try {
            const query = 'SELECT * FROM jobTitles WHERE ID = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Update Job title
    static async updateJobTitleById(id, title, description, depId) {
        try {
            // Store the fields to update dynamically
            const updates = [];
            const values = [];
            let index = 1;

            if (title) {
                updates.push(`jobTitle = $${index}`);
                values.push(title);
                index++;
            }

            if (description) {
                updates.push(`description = $${index}`);
                values.push(description);
                index++;
            }

            if (depId) {
                updates.push(`departmentID = $${index}`);
                values.push(depId);
                index++;
            }

            if (updates.length === 0) {
                throw new Error("No fields provided for update");
            }

            const query = `UPDATE jobTitles SET ${updates.join(", ")} WHERE id = $${index} RETURNING *`;
            values.push(id); // Add ID as the last parameter

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Delete Job title
    static async deleteJobTitle(id) {
        try {
            const query = 'DELETE FROM jobTitles WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rowCount > 0; // Return true if a row was deleted, false if no rows were deleted
        } catch (err) {
            throw err;
        }
    }

}

module.exports = JobTitle;