import { Cart } from './cart';
import { Order } from './order';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  zipcode?: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  cart?: Cart;
  cartId?: string;
}
