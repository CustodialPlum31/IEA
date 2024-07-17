const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error del server' });
        }
        conn.query('SELECT * FROM componente', (err, componentes) => {
            if (err) {
                return res.status(500).json({ error: 'Error del server' });
            }
            res.render('solcomponentes', { componentes });
        });
    });
};

controller.pedirPrestamo = (req, res) => {
    const { componentes, cantidad } = req.body; // Obtener componentes y cantidad del cuerpo de la solicitud

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error del server' });
        }

        // Verificar si hay suficientes componentes disponibles
        conn.query('SELECT cantidad FROM componente WHERE id_c = ?', [componentes], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: 'No se encontro el componente' });
            }

            const cantidadDisponible = results[0].cantidad;

            if (cantidad > cantidadDisponible) {
                return res.status(400).json({ error: 'No hay suficientes componentes disponibles' });
            }

            // Actualizar la cantidad disponible restando la cantidad solicitada
            const nuevaCantidad = cantidadDisponible - cantidad;
            conn.query('UPDATE componente SET cantidad = ? WHERE id_c = ?', [nuevaCantidad, componentes], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                //res.send(`Préstamo solicitado correctamente de ${cantidad} componentes.`);
                res.redirect('/solcomponente');
            });
        });
    });
};

module.exports = controller;
