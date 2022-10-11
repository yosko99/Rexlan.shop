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
import { OrderType } from '../../../types/orderTypes';

interface LocationPaymentType {
  state: {
    cartID: string
  }
}

const PaymentPage = () => {
  usePaymentRedirect();

  const [orderInfo, setOrderInfo] = useState<OrderType>();
  const [loading, setLoading] = useState(true);

  const location = useLocation() as unknown as LocationPaymentType;
  const navigate = useNavigate();

  const { lang } = useContext(CurrentLanguageContext);

  useEffect(() => {
    axios.get(getOrderRoute(location.state.cartID)).then((response) => {
      setOrderInfo(response.data);
      setLoading(false);
    }).catch((_err) => {
      navigate('/404');
    });
  }, []);

  return (
    <Container className='d-flex justify-content-center align-items-center flex-column'>
      {!loading
        ? <div className='shadow-lg p-5 text-center mt-2'>
          <Image src={securePaymentImg} alt='payment image' fluid className='mb-4' />
          <div className='text-left'>
            <p className='fs-2 m-0'>{lang.cart.paymentPage.toPay}</p>
            <p className='fs-2 m-0 mb-2'>{orderInfo!.productsPrice} $</p>
            <FontAwesomeIcon icon={faWarning} color='red' />
            <p className='text-danger m-0 mb-2'>{lang.cart.paymentPage.developmentWarning}</p>
            <p className='fs-5'>{lang.cart.paymentPage.choosePayment}</p>
          </div>
          <PaypalButtons
            className='w-100 d-flex justify-content-center align-items-center mt-3'
            value={orderInfo!.productsPrice.toString()}
          />
        </div>
        : <Loading height='70vh' />
      }
    </Container>
  );
};

export default PaymentPage;
