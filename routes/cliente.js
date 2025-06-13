const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombre_comercial
 *         - rut
 *         - direccion
 *         - categoria
 *         - contacto_nombre
 *         - contacto_email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental del cliente (PRIMARY KEY)
 *         nombre_comercial:
 *           type: string
 *           description: Nombre comercial del cliente
 *         rut:
 *           type: string
 *           description: RUT del cliente
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *         categoria:
 *           type: string
 *           enum: [Regular, Preferencial]
 *           description: Categoría del cliente
 *         contacto_nombre:
 *           type: string
 *           description: Nombre del contacto principal
 *         contacto_email:
 *           type: string
 *           description: Email del contacto principal
 *         porcentaje_oferta:
 *           type: integer
 *           description: Porcentaje de oferta para el cliente (opcional, por defecto 0)
 *       example:
 *         id: 1
 *         nombre_comercial: "Empresa Ejemplo"
 *         rut: "12.345.678-9"
 *         direccion: "Av. Principal 123"
 *         categoria: "Preferencial"
 *         contacto_nombre: "Juan Pérez"
 *         contacto_email: "juan@ejemplo.com"
 *         porcentaje_oferta: 10
 */

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gestión de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtiene la lista de todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', clienteController.getAll);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', clienteController.getById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', clienteController.create);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', clienteController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', clienteController.deleteById);

module.exports = router;