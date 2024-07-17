const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión a la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        conn.query(`
            SELECT p.id_p, i.nombre AS investigador_nombre, e.nombre AS equipo_nombre
            FROM prestamo p
            INNER JOIN customer i ON p.investigador_id = i.id
            INNER JOIN equipo e ON p.equipos_id = e.id_e
        `, (err, prestamos) => {
            if (err) {
                console.error('Error al obtener los préstamos:', err);
                return res.status(500).json({ error: 'Error al obtener los préstamos' });
            }
            
            res.render('estados', { prestamos });
        });
    });
};

module.exports = controller;
