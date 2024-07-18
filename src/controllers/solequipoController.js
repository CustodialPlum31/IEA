const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error con la BD:', err);
            return res.status(500).json({ error: 'Error con la BD' });
        }

        conn.query('SELECT * FROM equipo', (err, equipos) => {
            if (err) {
                console.error('Error en la consulat:', err);
                return res.json(err);
            }
            res.render('solequipos', {
                equipos: equipos
            });
        });
    });
};

controller.solicitarPrestamo = (req, res) => {
    const investigadorId = req.session.user.id; // Usando el id del investigador desde la sesión
    const equipoId = req.query.equipo_id; // Obtener el equipo_id desde los parámetros de la URL

    console.log('Investigador ID:', investigadorId);
    console.log('Equipo ID:', equipoId);

    if (!investigadorId) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    if (!equipoId) {
        return res.status(400).json({ error: 'Equipo no seleccionado' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error  conectando con la BD' });
        }

        // Insertar préstamo en la tabla prestamo
        conn.query('INSERT INTO prestamo (investigador_id, equipos_id) VALUES (?, ?)', [investigadorId, equipoId], (err, result) => {
            if (err) {
                //console.error('No se ingreso a la BD:', err);
                return res.status(500).json({ error: 'Error al solicitar préstamo' });
            }
            res.redirect('/prestamo'); // Redirigir a la página de equipos disponibles
        });
    });
};

module.exports = controller;
