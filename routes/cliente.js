const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Define tus rutas aquí
router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.deleteById);

module.exports = router;