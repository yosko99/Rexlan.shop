import { Product } from 'src/interfaces/product';
import getTranslation from './getTranslation';

const extractProductData = (product: Product, lang: string): Product => {
  const productTranslation = getTranslation(product.translations, lang);
  const categoryTranslation = getTranslation(
    product.category.translations,
    lang,
  );

  return {
    id: product.id,
    price: product.price,
    image: product.image,
    rating: product.rating,
    category:
      categoryTranslation?.title || product.category.translations[0].title,
    title: productTranslation?.title || product.translations[0].title,
    description:
      productTranslation?.description || product.translations[0].description,
  };
};

export default extractProductData;
