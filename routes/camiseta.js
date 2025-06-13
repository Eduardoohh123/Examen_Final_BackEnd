const express = require('express');
const Router = express.Router();
const Camiseta = require('../models/camiseta');

/**
 * @swagger
 * components:
 *   schemas:
 *     Camiseta:
 *       type: object
 *       required:
 *         - titulo
 *         - club
 *         - pais
 *         - tipo
 *         - color
 *         - precio
 *         - tallas
 *         - sku
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental de la camiseta (PRIMARY KEY)
 *         titulo:
 *           type: string
 *           description: Título de la camiseta
 *         club:
 *           type: string
 *           description: Club al que pertenece la camiseta
 *         pais:
 *           type: string
 *           description: País del club
 *         tipo:
 *           type: string
 *           description: "Tipo de camiseta (ej: local, visitante, alterna)"
 *         color:
 *           type: string
 *           description: Color principal de la camiseta
 *         precio:
 *           type: integer
 *           description: Precio base de la camiseta
 *         precio_oferta:
 *           type: integer
 *           nullable: true
 *           description: Precio de oferta (opcional)
 *         tallas:
 *           type: string
 *           description: "Tallas disponibles (ej: S,M,L,XL)"
 *         detalles:
 *           type: string
 *           nullable: true
 *           description: Detalles adicionales (opcional)
 *         sku:
 *           type: string
 *           description: Código SKU de la camiseta
 *       example:
 *         id: 1
 *         titulo: Camiseta 2024
 *         club: FC Barcelona
 *         pais: España
 *         tipo: Local
 *         color: Azul y grana
 *         precio: 12000
 *         precio_oferta: 9500
 *         tallas: S,M,L,XL
 *         detalles: Edición especial aniversario
 *         sku: BAR24HOME
 */

/**
 * @swagger
 * tags:
 *   name: Camisetas
 *   description: API para gestión de camisetas
 */

/**
 * @swagger
 * /camisetas:
 *   get:
 *     summary: Obtiene la lista de todas las camisetas
 *     tags: [Camisetas]
 *     responses:
 *       200:
 *         description: Lista de camisetas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Camiseta'
 */
Router.get('/', async (req, res) => res.json(await Camiseta.getAll()));

/**
 * @swagger
 * /camisetas/{id}:
 *   get:
 *     summary: Obtiene una camiseta por ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la camiseta
 *     responses:
 *       200:
 *         description: Camiseta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       404:
 *         description: Camiseta no encontrada
 */
Router.get('/:id', async (req, res) => res.json(await Camiseta.getById(req.params.id)));

/**
 * @swagger
 * /camisetas:
 *   post:
 *     summary: Crea una nueva camiseta
 *     tags: [Camisetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camiseta'
 *     responses:
 *       201:
 *         description: Camiseta creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       500:
 *         description: Error en el servidor
 */
Router.post('/', async (req, res) => res.json(await Camiseta.create(req.body)));

/**
 * @swagger
 * /camisetas/{id}:
 *   put:
 *     summary: Actualiza una camiseta por ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la camiseta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camiseta'
 *     responses:
 *       200:
 *         description: Camiseta actualizada
 *       404:
 *         description: Camiseta no encontrada
 *       500:
 *         description: Error en el servidor
 */
Router.put('/:id', async (req, res) => res.json(await Camiseta.update(req.params.id, req.body)));

/**
 * @swagger
 * /camisetas/{id}:
 *   delete:
 *     summary: Elimina una camiseta por ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la camiseta
 *     responses:
 *       200:
 *         description: Camiseta eliminada
 *       404:
 *         description: Camiseta no encontrada
 */
Router.delete('/:id', async (req, res) => res.json(await Camiseta.deleteById(req.params.id)));

/**
 * @swagger
 * /camisetas/{id}/precio/{cliente_id}:
 *   get:
 *     summary: Obtiene el precio final de una camiseta para un cliente específico
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la camiseta
 *       - in: path
 *         name: cliente_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Precio final calculado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 precio_final:
 *                   type: number
 *                   description: Precio final para el cliente
 */
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