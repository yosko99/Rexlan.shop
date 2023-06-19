import React, { useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

interface LocationPaymentType {
  state: {
    cartID: string
  }
}

// Check if cartID is set in session storage and redirect otherwise
const usePaymentRedirect = () => {
  const location = useLocation() as unknown as LocationPaymentType;
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
