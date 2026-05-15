const express = require("express");
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post('/signup', async (req, res) => {
    const { usuario, correo, clave } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave
    });
    user.clave = await user.encryptClave(user.clave);
    await user.save(); //save es un método de mongoose para guardar datos en MongoDB 
    res.json(user);
});
//inicio de sesión
router.post("/login", async (req, res) => {
    const { correo, clave } = req.body;
    
    // Buscar usuario por correo
    const user = await userSchema.findOne({ correo });
    if (!user) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    // Validar contraseña
    const validClave = await user.validateClave(clave);
    if (!validClave) {
        return res.status(401).json({ auth: false, token: null, message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.SECRET || 'secretkey', {
        expiresIn: 60 * 60 * 24, // un día
    });

    res.json({
        auth: true,
        token,
    });
});
module.exports = router;

