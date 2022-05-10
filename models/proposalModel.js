const mongoose = require('mongoose');

const proposalsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    shop_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shop',
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price.'],
    },
    count: Number,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Proposal = mongoose.model('Proposal', proposalsSchema);

module.exports = Proposal;
