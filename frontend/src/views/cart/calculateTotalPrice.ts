import { CartProductType, Product } from '../../types/productTypes';

const calculateTotalPrice = (
  products: Product[],
  cartProducts: CartProductType[],
  deliveryPrice: number): number => {
  const freeDeliverAtPrice = 99;
  let price = 0;

  products.forEach((product: Product, index: number) => {
    price += product.price * cartProducts[index].productQuantity;
  });

  // If price is bigger than 99 dont add delivery to total price
  if (price < freeDeliverAtPrice) {
    price += deliveryPrice;
  }

  return Number(price.toFixed(2));
};

export default calculateTotalPrice;
