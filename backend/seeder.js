const categories = require('./data/categories.json');
const products = require('./data/products.json');

const Category = require('./models/categoryModel');
const Product = require('./models/productModel');

const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    await Product.insertMany(products);
    await Category.insertMany(categories);

    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.log('Something went wrong error : ' + error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    console.log('Data destroyed');
    process.exit();
  } catch (error) {
    console.log('Something went wrong error : ' + error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
