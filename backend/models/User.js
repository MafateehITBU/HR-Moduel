const pool = require('../config/db');

class User {
  static async getAllUsers() {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Add more model methods as needed
}

module.exports = User; 