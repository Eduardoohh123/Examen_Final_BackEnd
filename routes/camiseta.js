const express = require('express');
const Router = express.Router();
const Camiseta = require('../models/camiseta');

// CRUD
Router.get('/', async (req, res) => res.json(await Camiseta.getAll()));
Router.get('/:id', async (req, res) => res.json(await Camiseta.getById(req.params.id)));
Router.post('/', async (req, res) => res.json(await Camiseta.create(req.body)));
Router.put('/:id', async (req, res) => res.json(await Camiseta.update(req.params.id, req.body)));
Router.delete('/:id', async (req, res) => res.json(await Camiseta.delete(req.params.id)));

// Precio final según cliente
Router.get('/:id/precio/:cliente_id', async (req, res) => {
    const camiseta = await Camiseta.getById(req.params.id);
    const cliente = await require('../models/cliente').getById(req.params.cliente_id);
    let precio_final = camiseta.precio;
    if (cliente && cliente.categoria === 'Preferencial' && camiseta.precio_oferta) {
        precio_final = camiseta.precio_oferta;
    } else if (cliente && cliente.porcentaje_oferta > 0) {
        precio_final = Math.round(camiseta.precio * (1 - cliente.porcentaje_oferta / 100));
    }
    res.json({ ...camiseta, precio_final });
});

module.exports = Router;