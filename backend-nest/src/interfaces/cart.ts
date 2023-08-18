import { Product } from './product';
import { User } from './user';

export interface Cart {
  id: string;
  totalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
  user?: User;
  userId?: string;
}
