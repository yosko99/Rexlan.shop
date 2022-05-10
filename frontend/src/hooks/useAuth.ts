import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { TokenContext } from '../context/TokenContext';

// Check if token is set and redirects to mainpage otherwise
const useAuth = (redirectOnExistingToken: boolean) => {
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectOnExistingToken) {
      if (token!.token !== null) {
        navigate('/');
      }
    } else {
      if (token!.token === null) {
        navigate('/');
      }
    }
  });
};

export default useAuth;
