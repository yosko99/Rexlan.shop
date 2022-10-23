import { Request, Response, NextFunction } from 'express';

import supportedLang from '../../constants/supportedLanguages';

type ExtendedRequest = Request & { currentLang: string };

const setLanguageMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const lang = (req.query.lang !== undefined ? req.query.lang : 'en') as string;

  if (supportedLang.includes(lang.toLowerCase())) {
    req.currentLang = lang;
  } else {
    req.currentLang = 'en';
  }

  next();
};

export default setLanguageMiddleware;
