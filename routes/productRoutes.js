const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProduct);
router.route('/proposals').post(productController.getShopProposals);

module.exports = router;
