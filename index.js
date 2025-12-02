require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// URI corregida con nombre de base de datos
const MONGODB_URI = "mongodb+srv://pdbuser:77131530@cluster0.g3rrqrw.mongodb.net/biblioteca?retryWrites=true&w=majority";

// Conexión sin opciones obsoletas
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    console.log(`� Base de datos: biblioteca`);
  })
  .catch(err => {
    console.error("❌ Error de conexión a MongoDB:", err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 API ejecutándose en http://localhost:3000`);
});