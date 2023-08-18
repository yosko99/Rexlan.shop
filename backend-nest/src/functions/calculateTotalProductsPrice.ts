import { Product } from 'src/interfaces/product';

const calculateTotalProductsPrice = (products: Product[]) => {
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price * products[i].quantity;
  }

  return totalPrice;
};

export default calculateTotalProductsPrice;
