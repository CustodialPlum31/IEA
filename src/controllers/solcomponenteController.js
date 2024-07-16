const controller = {};

controller.list = (req, res)=> {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM componente',(err, componentes) => {
        if(err){
            res.json(err);
        }
        res.render('solcomponentes', { 
            componente: componentes
            });
        });
    });
};

module.exports =  controller;