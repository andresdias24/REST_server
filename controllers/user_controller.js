const {response, query} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const userGet = async (req, res =  response ) => {
    
    const {limite = 3, desde = 0} = req.query;
    const query = { estado: true }
    
    // validar el async await  se ejecuntan  en orden pero si una respuesta no depende de la otra lo mejor es utilizar promise.all() el time sera mas rapido    
    const [total , usuarios] = await Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)), 
        Usuario.countDocuments(query)]);
    
    res.status(200).json({ ok: true,total, usuarios });
}


const userPut = async (req, res =  response ) => {

    const { id } = req.params;
    const { _id, google, password,  correo,  ...rest } = req.body;

    // TODO - Validar contra la base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);    
    }

    const usuarios = await Usuario.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
        ok: true,
        msg:`PUT- controller - ${id} - ${usuarios}`,
        usuarios
    })
}


const userDelete = async (req, res =  response ) => {
    const { id } = req.params;
    const usuario = req.usuario
    const usuarioDelete = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.status(200).json({
        ok: true,
        msg: 'DELETE- controller',
        usuarioDelete,
        usuario
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