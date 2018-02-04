// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar Rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');



// Conexión a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/dwh', (err, res) => {
    if (err) throw err;
    console.log('Base de datos dwh  => \x1b[35m%s\x1b[0m', 'online');

})

// Rutas
app.use('/usuario',usuarioRoutes);
app.use('/login',loginRoutes);
app.use('/',appRoutes);


// Middlewares


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor http://localhost:3000 => \x1b[35m%s\x1b[0m', 'online');

});