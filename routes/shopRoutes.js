const express = require('express');
const shopController = require('../controllers/shopController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/proposals').post(shopController.getShopProposals);

router.use(authController.protect);

router.use(authController.restrictTo('shop'));

router
  .route('/me')
  .get(shopController.getMyShops)
  .post(shopController.addMyShop);

module.exports = router;
