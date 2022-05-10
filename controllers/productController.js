const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Shop = require('../models/shopModel');

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

exports.getProductsAvailability = catchAsync(async (req, res, next) => {
  if (!req.body.length) {
    return next(
      new AppError('Please provide a list of desired products.', 400)
    );
  }

  const requestedProducts = req.body;
  const requestedProductsDetailedInfo = await Promise.all(
    requestedProducts.map((product) => Product.findById(product.product_id))
  );
  const shops = await Shop.find().populate({ path: 'products' });

  const proposals = shops.map((shop) => {
    const desiredProductsAvailability = requestedProductsDetailedInfo.map(
      (product) => {
        const shopProduct = shop.products.find((item) => {
          return item.product_id.toString() === product.id.toString();
        });

        const countDesired = requestedProducts.find(
          (item) => item.product_id.toString() === product.id.toString()
        ).count;

        let count;

        if (!shopProduct) {
          count = 0;
        } else if (shopProduct.count >= countDesired) {
          count = countDesired;
        } else {
          count = shopProduct.count;
        }

        return {
          id: product._id,
          name: product.name,
          weight: product.weight,
          packing: product.packing,
          manufacturer: product.manufacturer,
          image: product.image,
          price: shopProduct ? shopProduct.price : null,
          count_desired: countDesired,
          count,
        };
      }
    );

    return {
      id: shop._id,
      name: shop.name,
      address: shop.address,
      schedule: shop.schedule,
      coordinates: shop.coordinates,
      proposal: desiredProductsAvailability,
    };
  });

  res.status(200).json({
    status: 'success',
    data: proposals,
  });
});
