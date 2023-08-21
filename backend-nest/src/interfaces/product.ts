import { Cart } from './cart';
import { Category } from './category';
import { Order } from './order';

export interface Product {
  id: string;
  title?: string;
  price: number;
  description?: string;
  image: string;
  rating?: Rating;
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
  id: string;
  rate: number;
  count: number;
  product?: Product;
  productId: string;
}

export type ProductSortAttributes = 'createdAt' | 'updatedAt' | 'price';
