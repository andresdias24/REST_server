const Roles = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Roles.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
    return true;
}

    // verificar si el correo existe
    const existeCorreo = async (correo = '') => {
    const existeCorreoHelper = await Usuario.findOne({ correo });

    if( existeCorreoHelper ) {
        throw new Error(`El correo ${correo} ya existe`);
    }
}

module.exports = {
    esRolValido,
    existeCorreo
}