import { createContext } from 'react';

interface CurrentLanguageContextType {
    currentLanguage: string | null;
    setCurrentLanguage: (token: string | null) => void;
}

export const CurrentLanguageContext = createContext<CurrentLanguageContextType | null>(null);
