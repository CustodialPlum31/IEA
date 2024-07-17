const controller = {};

controller.list = (req, res) => {
    const investigadorId = req.session.user.id; // Suponiendo que el id del investigador está en la sesión

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error ' });
        }

        // Consultar los equipos prestados por el investigador
        const query = `
            SELECT equipo.nombre 
            FROM prestamo 
            JOIN equipo ON prestamo.equipos_id = equipo.id_e 
            WHERE prestamo.investigador_id = ?
        `;

        conn.query(query, [investigadorId], (err, prestamos) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los préstamos' });
            }
            res.render('prestamos', { prestamos: prestamos });
        });
    });
};

module.exports = controller;
