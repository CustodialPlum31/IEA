// routes/login.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login'); // Renderiza la vista de login
});

router.post('/', (req, res) => {
    const { email, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('SELECT * FROM customer WHERE correo = ?', [email], (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const user = results[0];

            // Comparación de contraseñas en texto plano
            if (user.contrasena !== password) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            req.session.user = {
                id: user.id,
                role: user.role
            };

            console.log('User authenticated, session established');


            // Redirigir según el rol del usuario
            if (user.role === 'admin') {
                res.redirect('/'); // Ruta para administradores
            } else if (user.role === 'investigador') {
                res.redirect('/solequipo'); // Ruta para investigadores
            } else {
                res.status(403).send('Forbidden'); // Manejo para otros roles
            }
            
            
        });
    });
});

module.exports = router;
