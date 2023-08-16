import Cart from './cart';
import Category from './category';
import Order from './order';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: Rating;
  createdAt: Date;
  updatedAt: Date;
  carts: Cart[];
  orders: Order[];
  translations: ProductTranslation[];
  category?: Category;
  categoryId?: string;
}

interface ProductTranslation {
  id: string;
  title: string;
  description: string;
  lang: string;
  product: Product;
  productId: string;
}

interface Rating {
  id: string;
  rate: number;
  count: number;
  product?: Product;
  productId: string;
}

export default Product;
