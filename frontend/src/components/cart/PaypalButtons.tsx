import React, { FC } from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
    value: string
}

const PaypalButtons: FC<Props> = ({ className, value }) => {
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
