var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();


exports.verificaToken = function (req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) return res.status(500).json({
            ok: false,
            mensaje: 'Error token',
            errors: err
        })
        req.usuario = decoded.usuario; // AGREGA EL PAYLOAD!
        next();

    });



}