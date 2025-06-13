const Cliente = require('../models/cliente');

const getAll = async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los clientes." });
    }
};

const getById = async (req, res) => {
    try {
        const cliente = await Cliente.getById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }
        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el cliente." });
    }
};

const create = async (req, res) => {
    try {
        const nuevo = await Cliente.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el cliente." });
    }
};

const update = async (req, res) => {
    try {
        const actualizado = await Cliente.update(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }
        res.status(200).json({ message: "Cliente actualizado." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el cliente." });
    }
};

const deleteById = async (req, res) => {
    try {
        const eliminado = await Cliente.deleteById(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }
        res.status(200).json({ message: "Cliente eliminado." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el cliente." });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};