const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category must have a name.'],
      unique: true,
      minlength: [
        3,
        'Category name must have more or equal then 3 characters.',
      ],
    },
    parent_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      default: null,
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

categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category_id',
  localField: '_id',
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
