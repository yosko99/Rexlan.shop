import Product from './product';
import User from './user';

interface Cart {
  id: string;
  totalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
  user?: User;
  userId?: string;
}
export default Cart;
