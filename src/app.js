const express = require('express');
const libroRoutes = require('./routes/libro.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/libros', libroRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Búsqueda de Libros',
    version: '1.0.0',
    endpoints: {
      libros: '/api/libros'
    }
  });
});

// Manejador de errores
app.use(errorHandler);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

module.exports = app;