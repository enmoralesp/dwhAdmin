// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    })
})

// Conexión a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/dwh', (err, res) => {
    if (err) throw err;
    console.log('Base de datos dwh  => \x1b[35m%s\x1b[0m', 'online');

})

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor http://localhost:3000 => \x1b[35m%s\x1b[0m', 'online');

});