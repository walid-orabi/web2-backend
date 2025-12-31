const pool = require('../config/database');

class Order {
  static async create(userId, items, total) {
    const sql = 'INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [userId, JSON.stringify(items), total]);
    return { id: result.insertId };
  }

  static async getByUserId(userId) {
    const sql = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
  }
}

module.exports = Order;