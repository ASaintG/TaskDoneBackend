const express = require('express');
const { obtenerNotas, crearNota } = require('../controllers/notesController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, obtenerNotas);
router.post('/', authenticateToken, crearNota);

module.exports = router;
