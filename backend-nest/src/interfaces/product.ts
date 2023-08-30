import { Cart } from './cart';
import { Category } from './category';
import { Order } from './order';
import { User } from './user';

export interface Product {
  id: string;
  title?: string;
  price: number;
  description?: string;
  image: string;
  ratings?: Rating[];
  rating: Rating;
  createdAt?: Date;
  updatedAt?: Date;
  cart?: Cart[];
  orders?: Order[];
  quantity?: number;
  translations?: ProductTranslation[];
  category?: Category;
  categoryId?: string;
}

export interface ProductTranslation {
  id: string;
  title: string;
  description: string;
  lang: string;
  product?: Product;
  productId: string;
}

export interface Rating {
  rate: number;
  count: number;
  product?: Product;
  productId?: string;
  user?: User;
  userId?: string;
}

export type ProductSortAttributes =
  | 'createdAt'
  | 'updatedAt'
  | 'price'
  | 'mostViewed';
