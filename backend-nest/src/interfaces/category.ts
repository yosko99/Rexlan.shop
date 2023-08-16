import Product from './product';

interface Category {
  id: string;
  title: string;
  bannerImage?: string;
  translations: CategoryTranslation[];
  products: Product[];
}

interface CategoryTranslation {
  id: string;
  title: string;
  lang: string;
  category: Category;
  categoryId: string;
}

export default Category;
