const Product = require('../../../models/productModel');

const getMaxProductID = async () => {
  const allProductIDs = await Product
    .find({})
    .select('id -_id');

  if (allProductIDs.length === 0) {
    return 1;
  }

  const { id } = allProductIDs.sort((a, b) => Number(b.id) - Number(a.id))[0];

  return Number(id) + 1;
};

module.exports = getMaxProductID;
