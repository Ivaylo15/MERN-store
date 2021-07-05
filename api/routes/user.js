const router = require('express').Router();
const user = require('../controllers/user');

router.post('/signUp', user.register);

router.post('/signIn', user.login);

router.post('/signOut', user.logout);

router.get('/auth', user.authUser);

module.exports = router;

