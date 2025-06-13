const db = require('../config/db');
const Cliente = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM cliente');
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query('SELECT * FROM cliente WHERE id = ?', [id]);
        return rows[0];
    },
    async create(data) {
        const [result] = await db.query(
            'INSERT INTO cliente (nombre_comercial, rut, direccion, categoria, contacto_nombre, contacto_email, porcentaje_oferta) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [data.nombre_comercial, data.rut, data.direccion, data.categoria, data.contacto_nombre, data.contacto_email, data.porcentaje_oferta]
        );
        return { id: result.insertId };
    },
    async update(id, data) {
        const [result] = await db.query(
            'UPDATE cliente SET nombre_comercial=?, rut=?, direccion=?, categoria=?, contacto_nombre=?, contacto_email=?, porcentaje_oferta=? WHERE id=?',
            [data.nombre_comercial, data.rut, data.direccion, data.categoria, data.contacto_nombre, data.contacto_email, data.porcentaje_oferta, id]
        );
        return result.affectedRows > 0;
    },
    async deleteById(id) {
        const [result] = await db.query('DELETE FROM cliente WHERE id=?', [id]);
        return result.affectedRows > 0;
    }
};
module.exports = Cliente;