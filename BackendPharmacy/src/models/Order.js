const db = require('../config/database');

class Order {
  static create(order) {
    const stmt = db.prepare(`
      INSERT INTO orders (medicine_id, quantity, status)
      VALUES (@medicine_id, @quantity, @status)
    `);
    return stmt.run(order);
  }

  static getAll() {
    return db.prepare(`
      SELECT orders.*, medicines.name as medicine_name 
      FROM orders 
      JOIN medicines ON orders.medicine_id = medicines.id
    `).all();
  }

  static updateStatus(id, status) {
    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    return stmt.run(status, id);
  }
}

module.exports = Order;