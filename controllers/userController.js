const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    status: 'success',
    data: userData,
  });
});
