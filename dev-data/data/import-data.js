const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');
const Shop = require('../../models/shopModel');
const Proposal = require('../../models/proposalModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line
    console.log('DB connection successful!');
  });

// READ JSON FILE
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, 'utf-8')
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const shops = JSON.parse(fs.readFileSync(`${__dirname}/shops.json`, 'utf-8'));
const proposals = JSON.parse(
  fs.readFileSync(`${__dirname}/proposals.json`, 'utf-8')
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    // await Category.create(categories);
    // await Product.create(products);
    await User.create(users, { validateBeforeSave: false });
    // await Shop.create(shops);
    // await Proposal.create(proposals);

    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    // await Category.deleteMany();
    // await Product.deleteMany();
    await User.deleteMany();
    // await Shop.deleteMany();
    // await Proposal.deleteMany();

    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
