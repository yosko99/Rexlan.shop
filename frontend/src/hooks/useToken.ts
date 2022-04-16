import { useState } from 'react';

interface Token {
	token: string;
}

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString !== null) {
      const userToken = JSON.parse(tokenString);
      return userToken.token;
    }

    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  };
};

export default useToken;
