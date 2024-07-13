const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//importando rutas
const customerRoute = require('./routes/customer');

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

app.use('/', customerRoute);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto 3000');
})