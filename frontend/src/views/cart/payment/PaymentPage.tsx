/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Image } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';

import securePaymentImg from '../../../assets/cartpage/secure-payment.png';
import PaypalButtons from '../../../components/buttons/PaypalButtons';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import CenteredItems from '../../../styles/CenteredItems';
import { Product } from '../../../types/productTypes';

interface LocationPaymentType {
  state: {
    products: Product[];
    orderInfo: object;
    totalPrice: number;
  };
}

const PaymentPage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  const location = useLocation() as unknown as LocationPaymentType;

  if (location.state === null) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <div className="shadow-lg p-5 text-center mt-2">
        <Image
          src={securePaymentImg}
          alt="payment image"
          fluid
          width={350}
          className="mb-4"
        />
        <div className="text-left">
          <p className="fs-2 m-0">{lang.cart.paymentPage.toPay}</p>
          <p className="fs-2 m-0 mb-2">{location.state.totalPrice} $</p>
          <FontAwesomeIcon icon={faWarning} color="red" />
          <p className="text-danger m-0 mb-2">
            {lang.cart.paymentPage.developmentWarning}
          </p>
          <p className="fs-5">{lang.cart.paymentPage.choosePayment}</p>
        </div>
        <CenteredItems>
          <PaypalButtons
            products={location.state.products}
            orderInfo={location.state.orderInfo}
            className="mt-3 fs-1"
            totalPrice={location.state.totalPrice}
          />
        </CenteredItems>
      </div>
    </Container>
  );
};

export default PaymentPage;
