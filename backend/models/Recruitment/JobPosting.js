const pool = require('../config/db');

class JobPosting {
    static async create(jobTitleId, employmentType, salaryRange, location, jobRequirements, deadline, status) {
        const query = `INSERT INTO JobPostings (jobTitleId, employmentType, salaryRange, location, jobRequirements, deadline, status) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [jobTitleId, employmentType, salaryRange, location, jobRequirements, deadline, status];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async getAll() {
        return (await pool.query('SELECT * FROM JobPostings')).rows;
    }
    static async getById(id) {
        return (await pool.query('SELECT * FROM JobPostings WHERE id = $1', [id])).rows[0];
    }
    static async deleteById(id) {
        return await pool.query('DELETE FROM JobPostings WHERE id = $1', [id]);
    }
}

module.exports =  JobPosting;
