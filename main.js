const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoute');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/notas', noteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
