const router = require('express').Router();
const product = require('../controllers/product');
const validator = require('../utils/validations');

router.get('/productsFilters', product.filterOptions);

router.get('/products', product.paginatedResults);

router.get('/product/:id', product.singleProduct);

router.post('/products', validator.checkAddProduct, product.addProduct);

router.put('/products', validator.checkEditProduct, product.editProduct);

router.delete('/products', product.deleteProduct);

module.exports = router;