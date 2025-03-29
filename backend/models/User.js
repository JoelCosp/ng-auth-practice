const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir el esquema para el usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // El nombre es obligatorio
  },
  email: {
    type: String,
    required: true,  // El email es obligatorio
    unique: true,    // El email debe ser único
  },
  password: {
    type: String,
    required: true,  // La contraseña es obligatoria
  },
});

// Función para comparar la contraseña (cuando un usuario intente hacer login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encriptar la contraseña antes de guardar el usuario en la base de datos
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Si la contraseña no ha sido modificada, simplemente continúa
  }

  // Generar un "sal" y luego hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Crear el modelo de usuario basado en el esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
