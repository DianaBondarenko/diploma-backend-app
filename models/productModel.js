const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product must have a name.'],
      minlength: [5, 'Product name must have more or equal then 5 characters.'],
      maxlength: [
        80,
        'Product name must have less or equal then 40 characters.',
      ],
    },
    price: Number,
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category.'],
    },
    weight: String,
    packing: String,
    manufacturer: String,
    image: String,
    proposals: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Proposal',
      },
    ],
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
