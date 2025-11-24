const Libro = require('../models/libro.model');

// Crear libro
exports.crear = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener todos los libros con paginación
exports.obtenerTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const libros = await Libro.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Libro.countDocuments();

    res.json({
      success: true,
      data: libros,
      paginacion: {
        paginaActual: page,
        totalPaginas: Math.ceil(total / limit),
        totalLibros: total,
        librosPorPagina: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener libro por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Buscar por título
exports.buscarPorTitulo = async (req, res) => {
  try {
    const libros = await Libro.find({
      titulo: { $regex: req.params.titulo, $options: 'i' }
    });

    res.json({
      success: true,
      data: libros,
      resultados: libros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Buscar por autor
exports.buscarPorAutor = async (req, res) => {
  try {
    const libros = await Libro.find({
      autor: { $regex: req.params.autor, $options: 'i' }
    });

    res.json({
      success: true,
      data: libros,
      resultados: libros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Buscar por ISBN
exports.buscarPorISBN = async (req, res) => {
  try {
    const libro = await Libro.findOne({ isbn: req.params.isbn });
    
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Búsqueda avanzada
exports.busquedaAvanzada = async (req, res) => {
  try {
    const { titulo, autor, genero, minPrecio, maxPrecio, disponible } = req.query;
    const filtros = {};

    if (titulo) filtros.titulo = { $regex: titulo, $options: 'i' };
    if (autor) filtros.autor = { $regex: autor, $options: 'i' };
    if (genero) filtros.genero = genero;
    if (disponible !== undefined) filtros.disponible = disponible === 'true';
    
    if (minPrecio || maxPrecio) {
      filtros.precio = {};
      if (minPrecio) filtros.precio.$gte = parseFloat(minPrecio);
      if (maxPrecio) filtros.precio.$lte = parseFloat(maxPrecio);
    }

    const libros = await Libro.find(filtros);

    res.json({
      success: true,
      data: libros,
      resultados: libros.length,
      filtrosAplicados: filtros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Búsqueda de texto completo
exports.busquedaTextoCompleto = async (req, res) => {
  try {
    const libros = await Libro.find(
      { $text: { $search: req.params.query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    res.json({
      success: true,
      data: libros,
      resultados: libros.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Actualizar libro
exports.actualizar = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Eliminar libro
exports.eliminar = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Libro eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};