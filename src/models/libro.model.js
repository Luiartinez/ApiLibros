const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    index: true
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true,
    index: true
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  editorial: {
    type: String,
    trim: true
  },
  anio: {
    type: Number,
    min: [1000, 'Año inválido'],
    max: [new Date().getFullYear(), 'Año no puede ser futuro']
  },
  genero: {
    type: [String],
    default: []
  },
  descripcion: {
    type: String,
    maxlength: [2000, 'Descripción muy larga']
  },
  precio: {
    type: Number,
    min: [0, 'El precio no puede ser negativo']
  },
  disponible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índice de texto para búsqueda avanzada
libroSchema.index({ 
  titulo: 'text', 
  autor: 'text', 
  descripcion: 'text' 
});

// Método virtual para obtener edad del libro
libroSchema.virtual('antiguedad').get(function() {
  if (this.anio) {
    return new Date().getFullYear() - this.anio;
  }
  return null;
});

module.exports = mongoose.model('Libro', libroSchema);