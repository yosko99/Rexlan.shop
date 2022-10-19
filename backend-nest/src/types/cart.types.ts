import { CartProductsType } from './product.types';

export interface CartType {
  isLinked: boolean;
  userID: string;
  totalPrice: number;
  products: CartProductsType[];
}
