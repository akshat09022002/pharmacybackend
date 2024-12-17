const db = require('../config/database');
const { addDays } = require('date-fns');

class Medicine {
  static getAll() {
    return db.prepare('SELECT * FROM medicines').all();
  }

  static getById(id) {
    return db.prepare('SELECT * FROM medicines WHERE id = ?').get(id);
  }

  static create(medicine) {
    const stmt = db.prepare(`
      INSERT INTO medicines (name, description, stock, minimum_stock, expiry_date)
      VALUES (@name, @description, @stock, @minimum_stock, @expiry_date)
    `);
    return stmt.run(medicine);
  }

  static updateStock(id, quantity) {
    const stmt = db.prepare('UPDATE medicines SET stock = stock + ? WHERE id = ?');
    return stmt.run(quantity, id);
  }

  static getLowStock() {
    return db.prepare('SELECT * FROM medicines WHERE stock <= minimum_stock').all();
  }

  static getNearExpiry() {
    const thirtyDaysFromNow = addDays(new Date(), 30).toISOString().split('T')[0];
    return db.prepare('SELECT * FROM medicines WHERE expiry_date <= ?').all(thirtyDaysFromNow);
  }
}

module.exports = Medicine;