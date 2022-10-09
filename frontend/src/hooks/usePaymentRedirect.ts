import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// Check if cartID is set in session storage and redirect otherwise
const usePaymentRedirect = () => {
  const sessionCartID = sessionStorage.getItem('cartID');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionCartID === null) {
      navigate('/');
    } else {
      navigate('/payment');
    }
  }, []);
};

export default usePaymentRedirect;
