const pool = require('../config/database');

class MenuItem {
  static async getAll() {
    const sql = 'SELECT * FROM menu_items WHERE available = 1';
    const [rows] = await pool.execute(sql);
    return rows;
  }

  static async getByCategory(category) {
    const sql = 'SELECT * FROM menu_items WHERE category = ? AND available = 1';
    const [rows] = await pool.execute(sql, [category]);
    return rows;
  }
}

module.exports = MenuItem;