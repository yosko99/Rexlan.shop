import React, { useContext } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Image } from 'react-bootstrap';

import securePaymentImg from '../../../assets/cartpage/secure-payment.png';
import PaypalButtons from '../../../components/cart/PaypalButtons';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import usePaymentRedirect from '../../../hooks/usePaymentRedirect';

const PaymentPage = () => {
  const { lang } = useContext(CurrentLanguageContext);
  // usePaymentRedirect();

  return (
    <Container className='d-flex justify-content-center align-items-center flex-column'>
      <div className='shadow-lg p-5 text-center mt-2'>
        <Image src={securePaymentImg} alt='payment image' fluid className='mb-4'/>
        <div className='text-left'>
          <p className='fs-2 m-0'>{lang.cart.paymentPage.toPay}</p>
          <p className='fs-2 m-0 mb-2'>20.2 $</p>
          <FontAwesomeIcon icon={faWarning} color='red'/>
          <p className='text-danger m-0 mb-2'>{lang.cart.paymentPage.developmentWarning}</p>
          <p className='fs-5'>{lang.cart.paymentPage.choosePayment}</p>
        </div>
        <PaypalButtons
          className='w-100 d-flex justify-content-center align-items-center mt-3'
          value='1'
          />
      </div>
    </Container>
  );
};

export default PaymentPage;
