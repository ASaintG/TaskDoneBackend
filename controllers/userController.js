const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar usuario
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar usuario por email
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const usuario = rows[0];

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar token
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        // Consultar todos los usuarios
        const [usuarios] = await pool.query('SELECT id, nombre, email, creado_en FROM usuarios');

        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios' });
        }

        // Responder con los usuarios encontrados
        res.json({ usuarios });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
