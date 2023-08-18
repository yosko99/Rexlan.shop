import { Product } from './product';
import { User } from './user';

export interface Order {
  id: string;
  user: User;
  userId: string;
  orderStatus: string;
  selectedCourier: string;
  productsPrice: number;
  deliveryPrice: number;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}
