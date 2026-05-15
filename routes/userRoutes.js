const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require('./validate_token');

// READ ALL: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-clave"); // Excluir la clave por seguridad
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ONE: Obtener un solo usuario por su ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-clave");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE: Actualizar un usuario por su ID
router.put("/:id", async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.clave) {
        const userTemp = new User();
        data.clave = await userTemp.encryptClave(data.clave);
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    ).select("-clave");

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
