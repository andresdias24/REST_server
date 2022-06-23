const {response} = require('express');

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
const userPost = (req, res =  response ) => {
console.log("😆👽🕳👨‍💻 🧬 ~ file: user_controller.js ~ line 17 ~ req", req.body)
    const {nombre, edad}  = req.body 
    res.json({
        msg: 'POST- controller',
        nombre,
        edad
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