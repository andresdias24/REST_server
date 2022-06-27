const {respose} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generateJWT} =  require('../helpers/generate_JWT');
const {googleVerify} =  require('../helpers/google-verify');

const login = async (req, res = respose) => {
    try {
        
        const { correo, password  } = req.body;
        
        // validar que exista el usuario
        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no esta activo'
            });
        }

        // validar que el password sea correcto
        const validPassword =  bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password es incorrecto'
            });
        }
        
        // crear token
        const token = await generateJWT( usuario._id );

        res.json({
            ok: true,
            message: 'Login correcto',
            token,
            usuario
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error inesperado',
            error
        });
    }
}

const loginGoogle = async(req, res = response) => {

    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT( usuario._id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido',
            error
        })
    }
}

module.exports = {
    login,
    loginGoogle
}
