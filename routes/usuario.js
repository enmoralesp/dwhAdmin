var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();


var Usuario = require('../models/usuario');

// ===============================
// OBTENER TODOS LOS USUARIOS
// ===============================
app.get('/', (req, res) => {
    Usuario.find({}, 'nombre email')
        .exec((err, usuarios) => {
            if (err) return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: err
            })
            res.status(200).json({
                ok: true,
                data: usuarios,
                mensaje: 'Petición realizada correctamente - usuario'
            })
        });

});

// ===============================
// ACTUALIZAR USUARIOS
// ===============================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) return res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar usuario',
            errors: err
        })
        if (!usuario) return res.status(400).json({
            ok: false,
            mensaje: 'Usuario con id ' + id + ' no existe',
            errors: {
                message: 'Usuario con id ' + id + ' no existe'
            }
        });

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;
        usuario.save((err, usuarioGuardado) => {
            if (err) return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar el usuario',
                errors: err
            })
            usuarioGuardado.password = undefined;
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                usuariotoken:req.usuario
            })
        });


    });
});

// ===============================
// CREAR NUEVO USUARIO
// ===============================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear usuario',
            errors: err
        })
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken:req.usuario
        })
    });
});

// ===============================
// BORRAR USUARIOS
// ===============================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) return res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar usuario',
            errors: err
        })
        if (!usuarioBorrado) return res.status(400).json({
            ok: false,
            mensaje: 'Usuario con id ' + id + ' no existe',
            errors: {
                message: 'Usuario con id ' + id + ' no existe'
            }
        });
        res.status(201).json({
            ok: true,
            usuario: usuarioBorrado,
            usuariotoken:req.usuario
        })
    });
});

module.exports = app;