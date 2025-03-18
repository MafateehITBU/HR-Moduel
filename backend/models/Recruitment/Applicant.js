class Applicant {
    static async create(name, email, phone, resumeURL, jobPostingId, coverLetter, applicationDate, applicationSource, status) {
        const query = `INSERT INTO Applicants (name, email, phone, resumeURL, jobPostingId, coverLetter, applicationDate, applicationSource, status)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const values = [name, email, phone, resumeURL, jobPostingId, coverLetter, applicationDate, applicationSource, status];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async getAll() {
        return (await pool.query('SELECT * FROM Applicants')).rows;
    }
    static async getById(id) {
        return (await pool.query('SELECT * FROM Applicants WHERE id = $1', [id])).rows[0];
    }
    static async deleteById(id) {
        return await pool.query('DELETE FROM Applicants WHERE id = $1', [id]);
    }
}

module.exports = Applicant;