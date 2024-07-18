// Importar middleware
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql12');
const myConnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser');
const authorize = require('./middleware/authorize');
const authenticate = require('./middleware/authenticate'); // Importar el middleware de autenticación

require('dotenv').config();


//const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT } = require('./config.js');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;




// Import routes
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');

// Admin
const customerRoute = require('./routes/customer');//Investigador
const equipoRoute = require('./routes/equipo');//Equipos
const componenteRoute = require('./routes/componente');//Componentes
const estadoRoute = require('./routes/estado')

const presentacionRoute = require('./routes/presentacion');//Presentacion
const presentacion2Route = require('./routes/presentacion2');//Presentacion


// User
const solequipoRoute = require('./routes/solequipo');//Solicitar equipos
const solcomponenteRoute = require('./routes/solcomponente');//Solicitar componentes
const prestamoRoute = require('./routes/prestamo');//Ver mis prestamos


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
app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // Motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Buscar carpeta views

console.log('ENV Variables Loaded:');
console.log(process.env);


console.log(DB_HOST);
console.log(DB_USER);
console.log(DB_PASSWORD);
console.log(DB_PORT);
console.log(DB_NAME);

app.use(myConnection(mysql, {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
    insecureAuth: true
}, 'single'));



// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.use('/login', loginRoute);
app.use('/logout', logoutRoute);

app.use('/investigador', authenticate, authorize('admin'), customerRoute);
app.use('/equipo', authenticate, authorize('admin'), equipoRoute);
app.use('/componente', authenticate, authorize('admin'), componenteRoute);
app.use('/estado', authenticate, authorize('admin'), estadoRoute);

app.use('/solequipo', authenticate, authorize('investigador'), solequipoRoute);
app.use('/solcomponente', authenticate, authorize('investigador'), solcomponenteRoute);
app.use('/prestamo', authenticate, authorize('investigador'), prestamoRoute);

app.use('/2', authenticate, authorize(['investigador']), presentacion2Route);
app.use('/', authenticate, authorize( ['admin']), presentacionRoute);





app.listen(app.get('PORT'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('PORT')}`);
});