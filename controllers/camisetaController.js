const Camiseta = require('../models/camiseta');

const getAll = async (req, res) => {
    try {
        const camisetas = await Camiseta.getAll();
        res.status(200).json(camisetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las camisetas." });
    }
};

const getById = async (req, res) => {
    try {
        const camiseta = await Camiseta.getById(req.params.id);
        if (!camiseta) {
            return res.status(404).json({ message: "Camiseta no encontrada." });
        }
        res.status(200).json(camiseta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la camiseta." });
    }
};

const create = async (req, res) => {
    try {
        const nuevaCamiseta = await Camiseta.create(req.body);
        res.status(201).json(nuevaCamiseta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la camiseta." });
    }
};

const update = async (req, res) => {
    try {
        const camisetaActualizada = await Camiseta.update(req.params.id, req.body);
        if (!camisetaActualizada) {
            return res.status(404).json({ message: "Camiseta no encontrada." });
        }
        res.status(200).json({ message: "Camiseta actualizada." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la camiseta." });
    }
};

const deleteById = async (req, res) => {
    try {
        const camisetaEliminada = await Camiseta.deleteById(req.params.id);
        if (!camisetaEliminada) {
            return res.status(404).json({ message: "Camiseta no encontrada." });
        }
        res.status(200).json({ message: "Camiseta eliminada." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la camiseta." });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};