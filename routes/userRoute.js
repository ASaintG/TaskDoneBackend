const express = require('express');
const { registrarUsuario, iniciarSesion, obtenerUsuarios } = require('../controllers/userController');
const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.get('/prueba', obtenerUsuarios);

module.exports = router;
