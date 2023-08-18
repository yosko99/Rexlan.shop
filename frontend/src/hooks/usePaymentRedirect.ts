import React, { useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

// Check if cartID is set in session storage and redirect otherwise
const usePaymentRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state === null) {
      window.location.href = '/';
    } else {
      navigate('/payment');
    }
  }, []);
};

export default usePaymentRedirect;
