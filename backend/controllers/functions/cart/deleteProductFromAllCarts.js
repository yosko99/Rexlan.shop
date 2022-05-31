const Cart = require('../../../models/cartModel');

const deleteProductFromAllCarts = async (productID) => {
  const allCarts = await Cart.find({});

  allCarts.forEach(async (cart) => {
    if (cart.products.length > 0) {
      const cartProductsWithRemovedProduct = cart.products.filter((product) => {
        return product.productID !== productID;
      });
      cart.products = cartProductsWithRemovedProduct;
      await cart.save();
    }
  });
};

module.exports = deleteProductFromAllCarts;
