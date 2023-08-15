import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { TranslationService } from '../../translation/translation.service';
import { CategoriesService } from '../categories/categories.service';
import { CacheService } from '../../cache/cache.service';
import { CartsService } from '../carts/carts.service';

import { productSortingType, ProductType } from '../../types/product.types';
import { CategoryType } from '../../types/category.types';

import lang from '../../resources/lang';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryType>,
    private readonly translationService: TranslationService,
    private readonly categoriesService: CategoriesService,
    private readonly cacheService: CacheService,
    private readonly cartsService: CartsService,
  ) {}

  async getProducts(qty: string, currentLang: string) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `products-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel.find({}).limit(productQuantity);

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async getProduct(productID: string, currentLang: string) {
    const cacheKey = `product-${productID}-lang${currentLang}`;

    const product = await this.productModel
      .findOne({
        id: productID,
      })
      .select('-__v -_id');

    if (product === null) {
      return new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    const translatedProduct = await this.getTranslatedProduct(
      product,
      currentLang,
      cacheKey,
    );

    return translatedProduct;
  }

  async getProductsByCategory(
    qty: string,
    categoryName: string,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${categoryName}-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel
      .find({})
      .where('category')
      .equals(categoryName)
      .limit(productQuantity);

    if (products === null || products.length === 0) {
      return {
        products: [],
        msg: lang[currentLang].global.noDataWithProvidedCategory,
      };
    }

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );
    return translatedProducts;
  }

  async getProductsSortedByAttribute(
    qty: string,
    productAttribute: productSortingType,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${productAttribute}-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel
      .find({})
      .sort({ [productAttribute]: -1 })
      .limit(productQuantity);

    if (products === null || products.length === 0) {
      return {
        products: [],
        msg: lang[currentLang].global.couldNotFindData,
      };
    }

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async getProductsByQueryString(pattern: RegExp, currentLang: string) {
    const cacheKey = `${pattern}-lang${currentLang}`;

    const products = await this.productModel
      .find({
        $or: [
          {
            title: {
              $regex: pattern,
              $options: 'si',
            },
          },
          {
            translations: {
              $elemMatch: {
                title: {
                  $regex: pattern,
                  $options: 'si',
                },
              },
            },
          },
        ],
      })
      .limit(4);

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async createProduct(
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    const createdProductResponse = await this.createProvidedProductResponse(
      currentLang,
      title,
      price,
      description,
      category,
      image,
    );

    await this.cacheService.flushCache();

    return createdProductResponse;
  }

  async deleteProduct(
    currentProduct: mongoose.Document<ProductType> & ProductType,
    currentLang: string,
  ) {
    await this.categoriesService.deleteEmptyCategory(currentProduct.category);
    await this.cartsService.deleteProductFromAllCarts(currentProduct.id);
    await this.productModel.deleteOne({ id: currentProduct.id });
    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].global.dataDeleted,
    };
  }

  async updateProduct(
    currentProduct: mongoose.Document<ProductType> & ProductType,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    if (currentProduct.category !== category && category !== undefined) {
      await this.categoriesService.deleteEmptyCategory(currentProduct.category);
    }

    await this.updateProvidedProduct(
      currentProduct,
      title,
      price,
      description,
      category,
      image,
      currentLang,
    );
    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.product.productUpdated,
    };
  }

  private async updateProvidedProduct(
    currentProduct: mongoose.Document<ProductType> & ProductType,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    const newDescription =
      description === undefined ? currentProduct.description : description;
    const newTitle = title === undefined ? currentProduct.title : title;

    let product = {};

    if (currentLang !== 'en') {
      // Update non english
      const doesTranslationExistOnProduct =
        currentProduct.translations.find(
          (translation) => translation.lang === currentLang,
        ) !== undefined;

      if (doesTranslationExistOnProduct) {
        currentProduct.translations = currentProduct.translations.map(
          (translation) => {
            const returnValue = { ...translation };

            if (translation.lang === currentLang) {
              translation.title =
                title === undefined ? translation.title : title;
              translation.description =
                description === undefined
                  ? translation.description
                  : description;
            }

            return returnValue;
          },
        );
      } else {
        currentProduct.translations.push({
          lang: currentLang,
          title: newTitle,
          description: newDescription,
        });
      }

      product = {
        price,
        category,
        image,
        translations: currentProduct.translations,
      };
    } else {
      // Update english
      product = {
        title,
        price,
        description,
        category,
        categoryURL: category,
        image,
      };
    }

    await this.productModel.updateOne({ id: currentProduct.id }, product);
  }

  private async createProvidedProductResponse(
    currentLang: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
  ) {
    const doesCategoryExists =
      (await this.categoryModel.findOne({ name: category })) !== null;

    if (!doesCategoryExists) {
      return new HttpException(
        'Category with provided name does not exists',
        405,
      );
    }

    const maxID = await this.getMaxProductID();

    const newProduct = {
      title,
      price: price === undefined ? 0 : price,
      description,
      category,
      image,
      categoryURL: category,
      id: maxID,
      translations: [],
    };

    if (currentLang !== 'en') {
      newProduct.translations.push({
        lang: currentLang,
        title,
        description,
      });
    }

    const createdProduct = await this.productModel.create(newProduct);

    return {
      msg: lang[currentLang].controllers.product.productCreated,
      product: createdProduct,
    };
  }

  private async getMaxProductID() {
    const allProductIDs = await this.productModel.find({}).select('id -_id');

    if (allProductIDs.length === 0) {
      return 1;
    }

    const { id } = allProductIDs.sort((a, b) => Number(b.id) - Number(a.id))[0];

    return Number(id) + 1;
  }

  private async getTranslatedProducts(
    products: ProductType[],
    currentLang: string,
    cacheKey: string,
  ) {
    return await this.cacheService.setAndGetData(cacheKey, async () => {
      return await this.translationService.getProductsTranslation(
        currentLang,
        products,
      );
    });
  }

  private async getTranslatedProduct(
    product: ProductType,
    currentLang: string,
    cacheKey: string,
  ) {
    return await this.cacheService.setAndGetData(cacheKey, async () => {
      return await this.translationService.getProductTranslation(
        currentLang,
        product,
      );
    });
  }

  private getQueryQty(queryQty: string) {
    const queryQuantity = queryQty;

    const quantity = queryQuantity !== undefined ? queryQuantity : 0;

    return Number(quantity);
  }
}
