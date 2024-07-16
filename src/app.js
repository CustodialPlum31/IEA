const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser');

//importando rutas
const customerRoute = require('./routes/customer');
const equipoRoute = require('./routes/equipo');
const componenteRoute = require('./routes/componente');
const presentacionRoute = require('./routes/presentacion');
const solequipoRoute = require('./routes/solequipo');
const solcomponenteRoute = require('./routes/solcomponente');
    

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');//Motor de plantillas
app.set('views',path.join(__dirname,'views')); //Buscar carpeta views

//middlewares
app.use(morgan('dev'));//Identificar algun tipo de peticion y ruta
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'Up1_M4N12#',
    port:'3306',
    database:'ieamysql'
},'single'));

app.use(express.urlencoded({extended: false})); //Metodo que permite entender datos desde un formulario 


//rutas


app.use('/investigador', customerRoute);
app.use('/equipo', equipoRoute);
app.use('/componente', componenteRoute);
app.use('/estado', componenteRoute);

app.use('/solequipo', solequipoRoute);
app.use('/solcomponente', solcomponenteRoute);
//app.use('/prestamos', componenteRoute);

app.use('/', presentacionRoute);

//app.use('/login',loginRoute);


//static files
app.use(express.static(path.join(__dirname, 'public')));


//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto 3000');
})