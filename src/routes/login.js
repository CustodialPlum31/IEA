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
                return res.status(401).send('Correo electrónico o contraseña incorrectos. Intenta de nuevo =)');
    
            }

            const user = results[0];

            // Comparación de contraseñas
            if (user.contrasena !== password) {
                return res.status(401).send('Correo electrónico o contraseña incorrectos. Intenta de nuevo =)');
    
            }

            req.session.user = {
                id: user.id,
                role: user.role
            };

            //console.log('Usuario autenticado');


            //Ruta segun el rol
            if (user.role === 'admin') {
                res.redirect('/'); // Ruta para administradores
            } else if (user.role === 'investigador') {
                res.redirect('/2'); // Ruta para investigadores
            } else {
                res.status(403).send('Forbidden'); // Manejo para otros roles
            }
            
            
        });
    });
});

module.exports = router;
