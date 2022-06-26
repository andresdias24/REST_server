

const  validarCampos  = require('../middlewares/validar-caampos');
const valiadteJWT  = require('../middlewares/validateJWT');
const  tieneRol = require('../middlewares/validateRols');

module.exports = {
    ...validarCampos,
    ...valiadteJWT,
    ...tieneRol
}