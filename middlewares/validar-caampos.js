

const { validationResult } = require('express-validator');


// validar los campos del body
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    next();
}

module.exports = {
    validarCampos
}