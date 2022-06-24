const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const { userGet, userDelete, userPost, userPut } = require('../controllers/user_controller');

router.get('/', userGet);

router.put('/', userPut);


router.post('/', [
    check(
        'correo', 'El correo es invalido'
    ).isEmail(),
],
userPost);

router.delete('/', userDelete);


module.exports = router;