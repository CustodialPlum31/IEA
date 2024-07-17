const controller = {};

controller.show = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Database connection error');
        }
        conn.query('SELECT nombre FROM customer WHERE id = ?', [req.user.id], (err, customer) => {
            if (err || customer.length === 0) {
                return res.status(500).send('Error fetching user data');
            }
            res.render('presentacion2', {
                user: {
                    name: customer[0].nombre
                }
            });
        });
    });
};

module.exports = controller;
