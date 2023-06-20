const updateProductCategory = require('./updateProductCategory');
const Category = require('../../../models/categoryModel');

const updateCategory = async (currentLang, currentCategoryID, newCategoryName, bannerImage) => {
  const currentCategory = await Category.findOne({ _id: currentCategoryID });

  const doesTranslationExistOnCategory = currentCategory.translations.find(
    (translation) => translation.lang === currentLang) !== undefined;

  if (currentLang !== 'en') {
    // Update non english category
    if (doesTranslationExistOnCategory) {
      currentCategory.translations = currentCategory.translations.map((translation) => {
        const returnValue = { ...translation };

        if (translation.lang === currentLang) {
          translation.name = newCategoryName === undefined ? translation.name : newCategoryName;
        }

        return returnValue;
      });
    } else {
      currentCategory.translations.push({
        lang: currentLang,
        name: newCategoryName === undefined ? currentCategory.name : newCategoryName
      });
    }
  } else {
    // Update english category
    currentCategory.name = newCategoryName === undefined ? currentCategory.name : newCategoryName;
    currentCategory.bannerImage = bannerImage === undefined ? currentCategory.bannerImage : bannerImage;

    await updateProductCategory(currentCategoryID, newCategoryName);
  }

  await currentCategory.save();
};

module.exports = updateCategory;
