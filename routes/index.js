const express = require('express');
const router = express.Router();

// Importar las rutas de los diferentes módulos
const camisetaRouter = require('./camiseta');
const clienteRouter = require('./cliente');

// Asociar las rutas importadas a sus respectivos endpoints
router.use('/camisetas', camisetaRouter);
router.use('/clientes', clienteRouter);

// Middleware para capturar rutas no encontradas
router.use((req, res) => {
    console.log('Ruta no encontrada en index ' + req.method + ' ' + req.url);
    res.status(404).send('Ruta no encontrada');
});

module.exports = router;