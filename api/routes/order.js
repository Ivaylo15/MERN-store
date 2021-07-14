const router = require('express').Router();
const order = require('../controllers/order');

router.get('/order/:id', order.ordersForUser);

router.post('/order', order.createOrder);

module.exports = router;

