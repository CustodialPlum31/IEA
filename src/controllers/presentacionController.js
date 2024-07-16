const controller = {};

controller.show = (req, res) => {

    const {id} = 1;
    req.getConnection((err,conn) => {
        conn.query('SELECT nombre FROM customer WHERE id = ?',[id], (err, customer) => {
            res.render('presentacion', {
                data:customer[0]
            });
        });
    });
};



module.exports =  controller;