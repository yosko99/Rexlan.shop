import { CartProductsType } from './product.types';

export interface OrderType {
  userID?: string;
  cartID?: string;
  orderStatus?: string;
  selectedCourier: string;
  name?: string;
  address?: string;
  city?: string;
  zipcode?: number;
  phone?: string;
  productsPrice: number;
  deliveryPrice: number;
  products: CartProductsType[];
  timestamps?: Date;
}
