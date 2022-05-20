const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let products = await Product.find().populate({
    path: 'proposals',
    options: { select: { price: 1 } },
  });

  if (req.query?.searchValue) {
    const searchValue = req.query?.searchValue.toLowerCase();
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});

exports.getProduct = factory.getOne(Product, {
  path: 'proposals',
  options: { select: { price: 1 } },
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    name: req.body.name,
    category_id: req.body.category_id,
    weight: req.body.weight,
    packing: req.body.packing,
    manufacturer: req.body.manufacturer,
    image: req.body.image,
  });

  res.status(200).json({
    status: 'success',
    data: newProduct,
  });
});
