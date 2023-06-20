const supportedLang = ['en', 'bg'];

const setLanguageMiddleware = (req, res, next) => {
  const lang = req.query.lang !== undefined ? req.query.lang : 'en';

  if (supportedLang.includes(lang.toLowerCase())) {
    req.currentLang = lang;
  } else {
    req.currentLang = 'en';
  }

  next();
};

module.exports = setLanguageMiddleware;
