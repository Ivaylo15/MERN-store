const router = require('express').Router();
const user = require('../controllers/user');

router.get('/auth', user.authUser);

router.post('/signUp', user.register);

router.post('/signIn', user.login);

router.post('/signOut', user.logout);

router.put('/addToBasket', user.addToBasket);


module.exports = router;

