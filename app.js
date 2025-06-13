const express= require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


//cargar las variables de entorno de .env
require ('dotenv').config();

const app = express();
app.use(bodyparser.json());

//Midelware para registrar las peticiones entrantes
app.use((req, res, next) => {
    console.log(`Peticion entrante: ${req.method} ${req.url}`);
    next();
});
// Configuración de Swagger (debe ir antes de las rutas y del middleware 404)
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentación',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definir las rutas de los diferentes modulos para el archivo index.js
const routes = require('./routes/index'); // Importa antes de usar
//asociar las rutas a sus respectivos endpoints
app.use('/api', routes);
// Tus rutas principales
app.use('/', routes); // Ahora sí puedes usarla
//midelware para capturar errores
app.use((err, req, res, next ) => {
    console.error('Error en la aplicacion:', err);
    res.status(500).json({error: 'Error en la aplicacion',});
});
//midelware para capturar rutas no encontradas
app.use((req, res) => {
    console.log(`Ruta no encontrada en app.js ${req.method} ${req.url}`);
    res.status(404).json('Ruta no encontrada');
});

//iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ${PORT}');
    console.log('Entorno: ${process.env.NODE_ENV}');
    console.log('Base de datos: ${process.env.DB_HOST}');   
    console.log('URL base : http://localhost:${PORT}/api'); 
});
