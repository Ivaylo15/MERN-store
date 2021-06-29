const router = require('express').Router();
const product = require('../controllers/product');

router.get('/products', product.paginatedResults);

router.post('/addProduct', product.addProduct);

router.put('/editProduct', product.editProduct);

router.delete('/deleteProduct', product.deleteProduct);

module.exports = router;