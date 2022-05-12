const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  if (!req.body?.products?.length) {
    return next(new AppError('Order must contain at least one product.', 400));
  }

  const order = await Order.create(req.body);

  res.status(200).json({
    status: 'success',
    data: order,
  });
});
