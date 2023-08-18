import { FREE_DELIVERY_PRICE } from '../../constants/prices';
import { Product } from '../../types/productTypes';

const calculateTotalPrice = (
  products: Product[],
  deliveryPrice: number
): number => {
  let price = 0;

  products.forEach((product: Product) => {
    price += product.price * product.quantity;
  });

  if (price < FREE_DELIVERY_PRICE) {
    price += deliveryPrice;
  }

  return Number(price.toFixed(2));
};

export default calculateTotalPrice;
