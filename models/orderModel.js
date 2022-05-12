const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // TODO: add validation for number
  phone: {
    type: String,
    required: [true, 'Order must have a number.'],
  },
  shop_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    required: [true, 'Order must have a shop id.'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  payment_method: {
    type: String,
    default: 'in_place',
  },
  delivery_method: {
    type: String,
    default: 'in_place',
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      count: Number,
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
