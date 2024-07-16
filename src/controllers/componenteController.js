const controller = {};

controller.list = (req, res)=> {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM componente',(err, componentes) => {
        if(err){
            res.json(err);
        }
        res.render('componentes', {
            data: componentes
        });
        });
    });
};

controller.save = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO componente set ?',[data],(err, componente) =>{
            res.redirect('/componente');
        })
    });
};


controller.edit = (req,res) => {//EDIT
    const {id_c} = req.params;
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM componente WHERE id_c = ?',[id_c], (err, componente) => {
            res.render('componentes_edit', {
                data:componente[0]
            });
        });
    });
};

controller.update = (req,res) => {//UPDATE
    const {id_c} = req.params;
    const newCustomer = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE componente set ? WHERE id_c = ?',[newCustomer, id_c], (err, componente) => {
            res.redirect('/componente');
        });
    });
};


controller.delete = (req,res) => {
  const {id_c} = req.params;
   req.getConnection((err,conn) => {
    conn.query('DELETE FROM componente WHERE id_c = ?',[id_c],(err, rows) => {
        res.redirect('/componente')
    })
   })
};



module.exports =  controller;