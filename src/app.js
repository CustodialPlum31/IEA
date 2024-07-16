// Importar middleware
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser');
const authorize = require('./middleware/authorize');
const authenticate = require('./middleware/authenticate'); // Importar el middleware de autenticación

// Import routes
const loginRoute = require('./routes/login');

// Admin
const customerRoute = require('./routes/customer');
const equipoRoute = require('./routes/equipo');
const componenteRoute = require('./routes/componente');

// User
const presentacionRoute = require('./routes/presentacion');
const solequipoRoute = require('./routes/solequipo');
const solcomponenteRoute = require('./routes/solcomponente');


// Middlewares

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.use(express.urlencoded({ extended: false })); // Método que permite entender datos desde un formulario

app.use(bodyParser.json());

app.use(morgan('dev')); // Identificar algún tipo de petición y ruta


// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // Motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Buscar carpeta views


app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'Up1_M4N12#',
    port: '3306',
    database: 'ieamysql'
}, 'single'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes


app.use('/login', loginRoute);

app.use('/investigador', authenticate, authorize('admin'), customerRoute);
app.use('/equipo', authenticate, authorize('admin'), equipoRoute);
app.use('/componente', authenticate, authorize('admin'), componenteRoute);
app.use('/estado', authenticate, authorize('admin'), componenteRoute);

app.use('/solequipo', authenticate, authorize('investigador'), solequipoRoute);
app.use('/solcomponente', authenticate, authorize('investigador'), solcomponenteRoute);
//app.use('/prestamo', authenticate, authorize('investigador'), prestamoRoute);

app.use('/', authenticate, authorize(['investigador', 'admin']), presentacionRoute);


// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto 3000');
});
