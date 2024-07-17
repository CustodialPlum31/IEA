const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        conn.query(`
            SELECT p.id_p, i.nombre AS investigador_nombre, e.nombre AS equipo_nombre
            FROM prestamo p
            INNER JOIN customer i ON p.investigador_id = i.id
            INNER JOIN equipo e ON p.equipos_id = e.id_e
        `, (err, prestamos) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los préstamos' });
            }
            
            res.render('estados', { prestamos });
        });
    });
};


controller.delete = (req,res) => {
    const {id_p} = req.params;
     req.getConnection((err,conn) => {
      conn.query('DELETE FROM prestamo WHERE id_p = ?',[id_p],(err, rows) => {
          res.redirect('/estado')
      })
     })
  };

module.exports = controller;
