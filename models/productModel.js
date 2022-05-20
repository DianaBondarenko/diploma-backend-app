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
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category.'],
    },
    weight: {
      type: String,
      required: [true, 'Product must have a weight.'],
    },
    packing: {
      type: String,
      required: [true, 'Product must have a packing.'],
    },
    manufacturer: {
      type: String,
      required: [true, 'Product must have a manufacturer.'],
    },
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

productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
