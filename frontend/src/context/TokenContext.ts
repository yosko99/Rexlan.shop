import { createContext } from 'react';

interface TokenType {
	token: string | null;
	setToken: (token: string | null) => void;
}

export const TokenContext = createContext<TokenType | null>(null);
