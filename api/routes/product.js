const router = require('express').Router();
const product = require('../controllers/product');
const validator = require('../utils/validations');
const { check } = require('express-validator');

router.get('/productsFilters', product.filterOptions);

router.get('/products', product.paginatedResults);

router.post('/products', validator.checkAddProduct, product.addProduct);

router.put('/products', validator.checkEditProduct, product.editProduct);

router.delete('/products', product.deleteProduct);

module.exports = router;