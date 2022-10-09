import React, { useContext } from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import PaymentType from '../../../types/paymentType';

interface LocationPaymentType {
    state: PaymentType;
}

interface PaymentInformationFieldType {
    text: string;
    data: string;
}

const SuccessfulPaymentPage = () => {
  const location = useLocation() as unknown as LocationPaymentType;
  const { lang } = useContext(CurrentLanguageContext);

  if (location.state === null) {
    window.location.href = '/';
  }

  const htmlFields: PaymentInformationFieldType[] = [
    {
      text: lang.cart.successfulPaymentPage.status,
      data: location.state.status
    },
    {
      text: lang.cart.successfulPaymentPage.createTime,
      data: location.state.create_time
    },
    {
      text: lang.cart.successfulPaymentPage.currentCurrency,
      data: location.state.purchase_units[0].amount.currency_code
    },
    {
      text: lang.cart.successfulPaymentPage.email,
      data: location.state.payer.email_address
    },
    {
      text: lang.cart.successfulPaymentPage.description,
      data: location.state.purchase_units[0].description
    },
    {
      text: lang.cart.successfulPaymentPage.paymentID,
      data: location.state.id
    }
  ];

  return (
        <Container className='d-flex justify-content-center'>
            <div className='shadow-lg mt-2 d-flex flex-column w-75'>
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    className='mt-4 mb-2'
                    color='green'
                    size='5x'
                />
                <p className='text-success text-center fs-3 mt-0 mb-2'>Payment successful</p>
                <div className='p-5 text-wrap text-break'>
                    {htmlFields.map((field: PaymentInformationFieldType, index: number) => (
                        <div key={index} className='d-flex my-2 flex-column flex-lg-row justify-content-between'>
                            <p className='m-0'>{field.text}</p>
                            <p className='m-0'>{field.data}</p>
                        </div>
                    ))}
                    <div className='d-flex flex-column my-2 flex-lg-row justify-content-between'>
                        <p className='m-0 my-3 fs-4'>{lang.cart.successfulPaymentPage.amountPayed}</p>
                        <p className='m-0 my-3 fs-4'>{location.state.purchase_units[0].amount.value}</p>
                    </div>
                </div>
            </div>
        </Container>
  );
};

export default SuccessfulPaymentPage;
