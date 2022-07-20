import { useState } from 'react';

const getLanguageFile = (language: string | null) => {
  let langFile;

  try {
    langFile = require(`../resources/lang.${language}`);
  } catch (error) {
    langFile = require('../resources/lang.en');
  }

  return langFile.default;
};

const useCurrentLanguage = () => {
  const getCurrentLanguage = () => {
    const localStorageCurrentLanguage = localStorage.getItem('language');
    return getLanguageFile(localStorageCurrentLanguage);
  };

  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const saveCurrentLanguage = (language: string) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(getCurrentLanguage());
  };

  return {
    setCurrentLanguage: saveCurrentLanguage,
    currentLanguage
  };
};

export default useCurrentLanguage;
