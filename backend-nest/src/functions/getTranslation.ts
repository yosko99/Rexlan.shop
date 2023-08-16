const getTranslation = (translations, lang) =>
  translations.find((translation) => translation.lang === lang);

export default getTranslation;
