var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['USER', 'ADMIN', 'GUEST'],
    message: '{VALUE} no es un rol permitido'

}


var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
    imagen: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: true,
        default: "USER",
        enum: rolesValidos
    }

});

usuarioSchema.plugin(uniqueValidator, {
    message: "{PATH} YA EXISTE!"
});

module.exports = mongoose.model('Usuario', usuarioSchema);