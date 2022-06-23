const {Router} = require('express');
const router = Router();
const { userGet, userDelete, userPost, userPut } = require('../controllers/user_controller');

router.get('/', userGet);

router.put('/', userPut);


router.post('/', userPost);

router.delete('/', userDelete);


module.exports = router;