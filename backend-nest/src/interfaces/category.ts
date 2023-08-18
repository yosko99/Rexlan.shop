import { Product } from './product';

export interface Category {
  id: string;
  title: string;
  bannerImage?: string;
  translations: CategoryTranslation[];
  products: Product[];
}

export interface CategoryTranslation {
  id: string;
  title: string;
  lang: string;
  category: Category;
  categoryId: string;
}
