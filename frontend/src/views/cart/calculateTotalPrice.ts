import { FREE_DELIVERY_PRICE } from '../../constants/prices';
import { CartProductType, Product } from '../../types/productTypes';

const calculateTotalPrice = (
  products: Product[],
  cartProducts: CartProductType[],
  deliveryPrice: number): number => {
  let price = 0;

  products.forEach((product: Product, index: number) => {
    price += product.price * cartProducts[index].productQuantity;
  });

  // If price is bigger than 99 dont add delivery to total price
  if (price < FREE_DELIVERY_PRICE) {
    price += deliveryPrice;
  }

  return Number(price.toFixed(2));
};

export default calculateTotalPrice;
