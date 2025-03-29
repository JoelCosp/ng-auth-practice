const jwt = require("jsonwebtoken");

// Middleware para verificar si el usuario tiene un token válido
const protect = (req, res, next) => {
  const token = req.header("Authorization"); // Obtener el token desde el encabezado "Authorization"

  if (!token) {
    return res.status(401).json({ message: "No se ha proporcionado un token, acceso denegado." });
  }

  try {
    // Verificar el token usando la clave secreta que está en .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar la información del usuario decodificada (ID) en la request
    req.user = decoded.userId;
    
    // Continuar con la siguiente función en la cadena
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token no válido." });
  }
};

module.exports = { protect };
