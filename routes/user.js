const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();
const { userGet, userDelete, userPost, userPut } = require('../controllers/user_controller');

const { validarCampos } = require('../middlewares/validar-caampos');
const { valiadteJWT } = require('../middlewares/validateJWT');
const { esAdminRole, tieneRol } = require('../middlewares/validateRols');

const {esRolValido, existeCorreo, existeUsuario} = require('../helpers/dbValidators');

router.get('/', userGet);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRolValido),
    validarCampos
], userPut);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo es invalido').isEmail(),
    check('correo').custom(existeCorreo),
    check('rol', 'El rol es obligatorio').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],
userPost);

router.delete('/:id', [
    valiadteJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], userDelete);


module.exports = router;