const deleteProductFromAllCarts = require('./functions/cart/deleteProductFromAllCarts');
const deleteEmptyCategory = require('./functions/category/deleteEmptyCategory');
const createCategory = require('./functions/category/createCategory');
const createProduct = require('./functions/product/createProduct');
const updateProduct = require('./functions/product/updateProduct');

const getProductsTranslation = require('./functions/product/getProductsTranslation');
const getProductTranslation = require('./functions/product/getProductTranslation');
const getOrSetRedisCache = require('./functions/utils/getOrSetRedisCache');
const getQueryQty = require('./functions/utils/getQueryQty');
const flushRedis = require('./functions/utils/flushRedis');

const Product = require('../models/productModel');

const lang = require('../resources/lang');

exports.getProducts = async (req, res) => {
  const productQuantity = getQueryQty(req.query.qty);
  const cacheKey = `products-qty${productQuantity}-lang${req.currentLang}`;

  const productsFromDB = await Product
    .find({})
    .limit(productQuantity);

  const products = await getOrSetRedisCache(cacheKey, async () => {
    return await getProductsTranslation(req.currentLang, productsFromDB);
  });

  res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const cacheKey = `product-${req.params.id}-lang${req.currentLang}`;

  const productFromDB = await Product.findOne({
    id: req.params.id
  }).select('-__v -_id');

  if (productFromDB === null) {
    return res.status(404).send(lang[req.currentLang].global.noDataWithProvidedID);
  }

  const product = await getOrSetRedisCache(cacheKey, async () => {
    return await getProductTranslation(req.currentLang, productFromDB);
  });

  res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  await deleteEmptyCategory(req.product.category);
  await deleteProductFromAllCarts(productID);
  await Product.deleteOne({ id: productID });
  await flushRedis();

  res.status(200).json({
    msg: lang[req.currentLang].global.dataDeleted
  });
};

exports.updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const { title, price, description, category, image } = req.body;
  const newCategoryName = category === undefined ? req.product.category : category;

  await deleteEmptyCategory(req.product.category);
  await createCategory(req.currentLang, newCategoryName);
  await updateProduct(productID, req.currentLang, { title, price, description, category, image });
  await flushRedis();

  res.status(200).json({
    msg: lang[req.currentLang].controllers.product.productUpdated
  });
};

exports.createProduct = async (req, res) => {
  const { title, price, description, category, image } = req.body;

  await createProduct(req.currentLang, { title, price, description, category, image });
  await createCategory(req.currentLang, category);
  await flushRedis();

  res.status(200).json({
    msg: lang[req.currentLang].controllers.product.productCreated
  });
};

exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const productQuantity = getQueryQty(req.query.qty);
  const cacheKey = `${category}-qty${productQuantity}-lang${req.currentLang}`;

  const productsFromDB = await Product.find({})
    .where('category')
    .equals(category)
    .limit(productQuantity);

  if (productsFromDB === null || productsFromDB.length === 0) {
    return res.status(206).json({
      products: [],
      msg: lang[req.currentLang].global.noDataWithProvidedCategory
    });
  }

  const products = await getOrSetRedisCache(cacheKey, async () => {
    return await getProductsTranslation(req.currentLang, productsFromDB);
  });

  res.status(200).json(products);
};

exports.getProductsSortedBy = async (req, res) => {
  const productQuantity = getQueryQty(req.query.qty);
  const attribute = req.params.attribute;
  const cacheKey = `${attribute}-qty${productQuantity}-lang${req.currentLang}`;

  const productsFromDB = await Product.find({})
    .sort({ [attribute]: -1 })
    .limit(productQuantity);

  if (productsFromDB === null || productsFromDB.length === 0) {
    return res.status(206).json({
      products: [],
      msg: lang[req.currentLang].global.couldNotFindData
    });
  }

  const products = await getOrSetRedisCache(cacheKey, async () => {
    return await getProductsTranslation(req.currentLang, productsFromDB);
  });

  res.status(200).json(products);
};

exports.getProductsByQueryString = async (req, res) => {
  const { pattern } = req.params;
  const cacheKey = `${pattern}-lang${req.currentLang}`;

  const productsFromDB = await Product
    .find({
      $or: [
        {
          title: {
            $regex: pattern,
            $options: 'si'
          }
        }, {
          translations: {
            $elemMatch: {
              title: {
                $regex: pattern,
                $options: 'si'
              }
            }
          }
        }
      ]
    })
    .limit(4);

  const products = await getOrSetRedisCache(cacheKey, async () => {
    return await getProductsTranslation(req.currentLang, productsFromDB);
  });

  res.status(200).json(products);
};
