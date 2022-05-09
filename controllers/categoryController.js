const Category = require('../models/categoryModel');
const factory = require('../controllers/handlerFactory');

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category, { path: 'products' });
