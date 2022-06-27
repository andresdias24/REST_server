const {Router} = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth_controller');
const {validarCampos} = require('../middlewares/validar-caampos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es Obligatoria' ).not().isEmpty(),
    validarCampos
], login);


router.post('/loginGoogle', [
    check('id_token', 'Id_token  es necesario').not().isEmpty(),
    validarCampos
], loginGoogle);

module.exports = router;