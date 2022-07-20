import { createContext } from 'react';

import HTMLFields from '../types/htmlFields';

interface CurrentLanguageContextType {
    lang: HTMLFields;
    setCurrentLanguage: (language: string) => void;
}

export const CurrentLanguageContext = createContext<CurrentLanguageContextType>({
  lang: {
    header: {
      languageSwitcherButton: 'Language',
      homeButton: 'Home',
      categoriesButton: 'Categories',
      contactsButton: 'Contacts'
    }
  },
  setCurrentLanguage (language) {

  }
});
