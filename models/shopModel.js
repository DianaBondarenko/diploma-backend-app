const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Shop must have a name.'],
    },
    address: {
      type: String,
      required: [true, 'Shop must have an address.'],
    },
    coordinates: [Number],
    schedule: {
      type: String,
      required: [true, 'Shop must have a schedule.'],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
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

shopSchema.virtual('products', {
  ref: 'Proposal',
  foreignField: 'shop_id',
  localField: '_id',
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
