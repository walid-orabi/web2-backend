const pool = require('../config/database');
// const bcrypt = require('bcryptjs');

class User {
  static async create(email, password, fname) {
    const sql = 'INSERT INTO userDB (email, password, fname) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [email, password, fname]);
    return { id: result.insertId, email, fname };
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM userDB WHERE email = ?';
    const [rows] = await pool.execute(sql, [email]);
    return rows[0];
  }

  static async findById(id) {
    const sql = 'SELECT id, email, fname FROM userDB WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  }
}

module.exports = User;