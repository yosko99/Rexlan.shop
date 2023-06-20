interface ProductTranslationType {
  title: string;
  description: string;
  lang: string;
}

export interface CartProductsType {
  productID: string;
  productQuantity: number;
}

export interface ProductType {
  id: string;
  title: string;
  categoryURL: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  translations: ProductTranslationType[];
}

export type productSortingType =
  | 'title'
  | 'price'
  | 'description'
  | 'category'
  | 'rating';
