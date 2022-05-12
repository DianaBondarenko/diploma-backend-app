const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.route('/proposals').post(shopController.getShopProposals);

module.exports = router;
