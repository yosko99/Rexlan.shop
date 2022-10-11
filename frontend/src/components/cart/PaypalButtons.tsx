import React, { FC } from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { getCartRoute } from '../../services/apiRoutes';

interface Props {
    className?: string;
    value: string
}

const PaypalButtons: FC<Props> = ({ className, value }) => {
  const navigate = useNavigate();

  const handleOnApprove = async () => {
    const cartID = localStorage.getItem('cart');

    await axios.delete(getCartRoute(cartID as string));

    localStorage.removeItem('cart');
  };

  return (
    <PayPalButtons
    className={className}
      style={{
        color: 'blue',
        shape: 'pill'
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Rexlan online purchase',
            amount: {
              value
            }
          }]
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order!.capture();

        await handleOnApprove();

        navigate('/payment-successful', { state: order });
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
