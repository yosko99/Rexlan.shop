/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { TokenContext } from '../../context/TokenContext';
import { getOrdersRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';

interface Props {
  className?: string;
  products: Product[];
  orderInfo: object;
  totalPrice: number;
}

const PaypalButtons: FC<Props> = ({
  className,
  totalPrice,
  orderInfo,
  products
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  const token = useContext(TokenContext);
  const navigate = useNavigate();

  return (
    <>
      {process.env.REACT_APP_PAYPAL_CLIENT_ID ? (
        <PayPalButtons
          className={className}
          style={{
            color: 'blue',
            shape: 'pill'
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Rexlan online purchase',
                  amount: {
                    value: String(totalPrice)
                  }
                }
              ]
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order!.capture();

            axios
              .post(
                getOrdersRoute(),
                { ...orderInfo, products },
                {
                  headers: { authorization: 'Bearer ' + token!.token }
                }
              )
              .then((response) => {
                navigate('/payment-successful', { state: order });
              });
          }}
          onCancel={() => {
            navigate('/cart');
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      ) : (
        <Alert variant="info" className="fs-5 rounded">
          {lang.cart.paymentPage.payPalNotSet}
        </Alert>
      )}
    </>
  );
};

export default PaypalButtons;
