require('dotenv').config();
const mysql = require('mysql2/promise');

// Verificar que las variables de entorno estén definidas
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PORT'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Crear pool de conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Puerto por defecto para MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;