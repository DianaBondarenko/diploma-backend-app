const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProduct);

module.exports = router;
