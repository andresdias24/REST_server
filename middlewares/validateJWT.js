const { request } = require('express');
const jwt = require('jsonwebtoken');

const valiadteJWT = (req = request, res, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

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