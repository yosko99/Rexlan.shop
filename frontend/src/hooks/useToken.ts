import { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString !== null) {
      return tokenString;
    }

    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | null) => {
    // delete token from local storage
    if (userToken === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', userToken);
      setToken(userToken);
    }
    setToken(getToken());
  };

  return {
    setToken: saveToken,
    token
  };
};

export default useToken;
