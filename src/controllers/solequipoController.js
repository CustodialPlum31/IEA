const controller = {};

controller.list = (req, res)=> {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM equipo',(err, equipos) => {
        if(err){
            res.json(err);
        }
        res.render('solequipos', { 
            equipo: equipos
            });
        });
    });
};

module.exports =  controller;