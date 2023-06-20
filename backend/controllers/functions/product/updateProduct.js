const Product = require('../../../models/productModel');

const updateProduct = async (productID, currentLang, { title, price, description, category, image }) => {
  const oldProductData = await Product.findOne({ id: productID });

  const newDescription = description === undefined ? oldProductData.description : description;
  const newTitle = title === undefined ? oldProductData.title : title;

  let product = {};

  if (currentLang !== 'en') {
    // Update non english
    const doesTranslationExistOnProduct = oldProductData.translations.find(
      (translation) => translation.lang === currentLang) !== undefined;

    if (doesTranslationExistOnProduct) {
      oldProductData.translations = oldProductData.translations.map((translation) => {
        const returnValue = { ...translation };

        if (translation.lang === currentLang) {
          translation.title = title === undefined ? translation.title : title;
          translation.description = description === undefined ? translation.description : description;
        }

        return returnValue;
      });
    } else {
      oldProductData.translations.push({
        lang: currentLang,
        title: newTitle,
        description: newDescription
      });
    }

    product = {
      price,
      category,
      image,
      translations: oldProductData.translations
    };
  } else {
    // Update english
    product = {
      title,
      price,
      description,
      category,
      categoryURL: category,
      image
    };
  }

  await Product.updateOne({ id: productID }, product);
};

module.exports = updateProduct;
