import React, { FC, useContext } from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  return (
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
  );
};

export default PaypalButtons;
