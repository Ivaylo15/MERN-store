const router = require('express').Router();
const product = require('../controllers/product');
const validator = require('../utils/validations');

router.get('/filters', product.filterOptions);

router.get('/', product.paginatedResults);

router.get('/:id', product.singleProduct);

router.post('/', validator.checkAddProduct, product.addProduct);

router.put('/', validator.checkEditProduct, product.editProduct);

router.delete('/:id', product.deleteProduct);

module.exports = router;