// db-init.js
const fs = require('fs');
const path = require('path');
const pool = require('./config/database');

async function initDatabase() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    await pool.query(sql);
    console.log('✓ Database initialized');
  } catch (error) {
    console.error('✗ Init failed:', error.message);
    throw error;
  }
}

if (require.main === module) {
  initDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = initDatabase;