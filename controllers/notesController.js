const pool = require('../db');

exports.obtenerNotas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notas WHERE usuario_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener notas' });
    }
};

exports.crearNota = async (req, res) => {
    const { titulo, contenido } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO notas (usuario_id, titulo, contenido) VALUES (?, ?, ?)',
            [req.user.id, titulo, contenido]
        );
        res.status(201).json({ message: 'Nota creada exitosamente', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear nota' });
    }
};
