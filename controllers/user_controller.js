const {response} = require('express');
const Usuario = require('../models/usuario');

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
const userPost =  async (req, res =  response ) => {
    const body = req.body;
    console.log("😆👽🕳👨‍💻 🧬 ~ file: user_controller.js ~ line 19 ~ body", body)
    const usuario = new Usuario(body);
    await usuario.save((err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        });
    })
}
const userDelete = (req, res =  response ) => {
    res.status(200).json({
        ok: true,
        msg: 'GET- controller'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}