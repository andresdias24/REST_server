const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const userGet = (req, res =  response ) => {
    res.status(200).json({
        ok: true,
        msg: 'GET- controller'
    })
}

const userPut = (req, res =  response ) => {
    res.status(200).json({
        ok: true,
        msg: 'GET- controller'
    })
}
// const userPost =  async (req, res =  response ) => {
//     const {nombre, correo, password, rol} = req.body;
//     const usuario = new Usuario({nombre, correo, password, rol});
//     // verificar si el correo existe
//     // encriptar la contraseña
//     const salt = bcriptjs.genSaltSync();
//     usuario.password = bcriptjs.hashSync(password, salt);   

//     await usuario.save((err, usuarioDB) => {
//         if(err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//         res.status(201).json({
//             ok: true,
//             usuario: usuarioDB
//         });
//     })
// }
const userDelete = (req, res =  response ) => {
    res.status(200).json({
        ok: true,
        msg: 'GET- controller'
    })
}

const userPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}