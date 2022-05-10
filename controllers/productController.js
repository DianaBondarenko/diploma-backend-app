const Product = require('../models/productModel');
const factory = require('./handlerFactory');

exports.getAllProducts = factory.getAll(Product, {
  path: 'proposals',
  options: { select: { price: 1 } },
});
exports.getProduct = factory.getOne(Product, {
  path: 'proposals',
  options: { select: { price: 1 } },
});
