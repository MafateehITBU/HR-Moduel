const pool = require('../../config/db');

class Team {
    // Create new Team
    static async createTeam(teamName, teamLead, depId) {
        try {
            const columns = ['teamName', 'depId'];
            const values = [teamName, depId];
            const placeholders = ['$1', '$2'];
            let index = 3;

            if (teamLead) {
                columns.push('teamLead');
                values.push(teamLead);
                placeholders.push(`$${index}`);
            }

            const query = `INSERT INTO teams (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`;
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Get all Teams
    static async getAllTeams() {
        try {
            const query = `SELECT * FROM teams`;
            const { rows } = await pool.query(query);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // Get Team by ID
    static async getTeamById(id) {
        try {
            const query = `SELECT * FROM teams WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Update Team
    static async updateTeam(id, teamName, teamLead, depId) {
        try {
            const updates = [];
            const values = [];
            let index = 1;

            if (teamName) {
                updates.push(`teamName = $${index}`);
                values.push(teamName);
                index++;
            }

            if (teamLead) {
                updates.push(`teamLead = $${index}`);
                values.push(teamLead);
                index++;
            }

            if (depId) {
                updates.push(`depId = $${index}`);
                values.push(depId);
                index++;
            }

            if (updates.length === 0) {
                throw new Error('No fields provided to update');
            }

            const query = `UPDATE teams SET ${updates.join(", ")} WHERE id = $${index} RETURNING *`;
            values.push(id);
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Delete Team by ID
    static async deleteTeam(id) {
        try {
            const query = `DELETE FROM teams WHERE id = $1 RETURNING *`;
            const result = await pool.query(query, [id]);
            return result.rowCount > 0;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Team;