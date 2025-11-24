const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libro.controller');

// Rutas CRUD básicas
router.post('/', libroController.crear);
router.get('/', libroController.obtenerTodos);
router.get('/:id', libroController.obtenerPorId);
router.put('/:id', libroController.actualizar);
router.delete('/:id', libroController.eliminar);

// Rutas de búsqueda
router.get('/buscar/titulo/:titulo', libroController.buscarPorTitulo);
router.get('/buscar/autor/:autor', libroController.buscarPorAutor);
router.get('/buscar/isbn/:isbn', libroController.buscarPorISBN);
router.get('/buscar/avanzada', libroController.busquedaAvanzada);
router.get('/buscar/texto/:query', libroController.busquedaTextoCompleto);

module.exports = router;