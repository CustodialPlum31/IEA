const controller = {};

controller.list = (req, res)=> {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM equipo',(err, equipos) => {
        if(err){
            res.json(err);
        }
        res.render('equipos', {
            data: equipos
        });
        });
    });
};

controller.save = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO equipo set ?',[data],(err, equipo) =>{
            res.redirect('/equipo');
        })
    });
};


controller.edit = (req,res) => {//EDIT
    const {id_e} = req.params;
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM equipo WHERE id_e = ?',[id_e], (err, equipo) => {
            res.render('equipos_edit', {
                data:equipo[0]
            });
        });
    });
};

controller.update = (req,res) => {//UPDATE
    const {id_e} = req.params;
    const newCustomer = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE equipo set ? WHERE id_e = ?',[newCustomer, id_e], (err, equipo) => {
            res.redirect('/equipo');
        });
    });
};


controller.delete = (req,res) => {
  const {id_e} = req.params;
   req.getConnection((err,conn) => {
    conn.query('DELETE FROM equipo WHERE id_e = ?',[id_e],(err, rows) => {
        res.redirect('/equipo')
    })
   })
};



module.exports =  controller;