const router = require('express').Router();
const product = require('../controllers/product');

router.get('/productsFilters', product.filterOptions);

router.get('/products', product.paginatedResults);

router.post('/products', product.addProduct);

router.put('/products', product.editProduct);

router.delete('/products', product.deleteProduct);

module.exports = router;