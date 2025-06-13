const db = require('../config/db');
const Camiseta = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM camiseta');
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query('SELECT * FROM camiseta WHERE id = ?', [id]);
        return rows[0];
    },
    async create(data) {
        const [result] = await db.query(
            'INSERT INTO camiseta (titulo, club, pais, tipo, color, precio, precio_oferta, tallas, detalles, sku) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.titulo, data.club, data.pais, data.tipo, data.color, data.precio, data.precio_oferta, data.tallas, data.detalles, data.sku]
        );
        return { id: result.insertId };
    },
    async update(id, data) {
        const [result] = await db.query(
            'UPDATE camiseta SET titulo=?, club=?, pais=?, tipo=?, color=?, precio=?, precio_oferta=?, tallas=?, detalles=?, sku=? WHERE id=?',
            [data.titulo, data.club, data.pais, data.tipo, data.color, data.precio, data.precio_oferta, data.tallas, data.detalles, data.sku, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await db.query('DELETE FROM camiseta WHERE id=?', [id]);
        return result.affectedRows > 0;
    }
};
module.exports = Camiseta;