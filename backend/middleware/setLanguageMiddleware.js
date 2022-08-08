const supportedLang = ['en', 'bg'];

const setLanguageMiddleware = (req, res, next) => {
  const lang = req.query.lang !== undefined ? req.query.lang : 'en';

  if (supportedLang.includes(lang.toLowerCase())) {
    req.lang = lang;
  } else {
    req.lang = 'en';
  }

  next();
};

module.exports = setLanguageMiddleware;
