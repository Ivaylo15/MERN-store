const router = require('express').Router();
const order = require('../controllers/order');
const validator = require('../utils/validations');


router.get('/:id', order.ordersForUser);

router.post('/', validator.checkOrder, order.createOrder);

module.exports = router;

