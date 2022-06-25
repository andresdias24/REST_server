const Roles = require('../models/role');
const Usuario = require('../models/usuario');


// validar si es un rol valido
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

// verificar si existe un usuario por id
const existeUsuario = async (id = '') => {
    const existeUsuarioHelper = await Usuario.findById(id);
    if (!existeUsuarioHelper) {
        throw new Error(`El usuario ${id} no existe`);
    }
};
module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuario
}