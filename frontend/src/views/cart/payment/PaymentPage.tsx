/* eslint-disable multiline-ternary */
import React, { useContext, useEffect, useState } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Container, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import securePaymentImg from '../../../assets/cartpage/secure-payment.png';
import PaypalButtons from '../../../components/cart/PaypalButtons';
import Loading from '../../../components/loading/Loading';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import usePaymentRedirect from '../../../hooks/usePaymentRedirect';
import { getOrderRoute } from '../../../services/apiRoutes';
import CenteredItems from '../../../styles/CenteredItems';
import { OrderType } from '../../../types/orderTypes';

interface LocationPaymentType {
  state: {
    cartID: string;
  };
}

const PaymentPage = () => {
  usePaymentRedirect();

  const [totalPrice, setTotalPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation() as unknown as LocationPaymentType;
  const navigate = useNavigate();

  const { lang } = useContext(CurrentLanguageContext);

  useEffect(() => {
    axios
      .get(getOrderRoute(location.state.cartID))
      .then((response) => {
        const order = response.data as OrderType;
        setTotalPrice(
          (order!.productsPrice + order!.deliveryPrice).toFixed(2).toString()
        );

        setLoading(false);
      })
      .catch((_err) => {
        navigate('/404');
      });
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      {!loading ? (
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
            <p className="fs-2 m-0 mb-2">{totalPrice} $</p>
            <FontAwesomeIcon icon={faWarning} color="red" />
            <p className="text-danger m-0 mb-2">
              {lang.cart.paymentPage.developmentWarning}
            </p>
            <p className="fs-5">{lang.cart.paymentPage.choosePayment}</p>
          </div>
          <CenteredItems>
            <PaypalButtons className="mt-3 fs-1" value={totalPrice} />
          </CenteredItems>
        </div>
      ) : (
        <Loading height="70vh" />
      )}
    </Container>
  );
};

export default PaymentPage;
