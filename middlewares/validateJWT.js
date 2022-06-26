const { request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const valiadteJWT = async (req = request, res, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario   = await  Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario deshabilitado'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    valiadteJWT
}