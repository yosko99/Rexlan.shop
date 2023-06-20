import { createContext } from 'react';

import defaultLang from '../resources/lang.en';
import HTMLFields from '../types/htmlFields';

interface CurrentLanguageContextType {
  lang: HTMLFields;
  setCurrentLanguage: (language: string) => void;
}

export const CurrentLanguageContext = createContext<CurrentLanguageContextType>({
  lang: defaultLang,
  setCurrentLanguage (language) {

  }
});
