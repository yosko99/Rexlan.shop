interface CategoryTranslationType {
  name: string;
  lang: string;
}

export interface CategoryType {
  name: string;
  bannerImage: string;
  categoryURL: string;
  translations: CategoryTranslationType[];
}
