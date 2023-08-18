import React, { useContext } from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import DataSplitBetween from '../../../components/partials/DataSplitBetween';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import getPaymentInfoHTMLFields from '../../../functions/getPaymentInfoHTMLFields';
import PaymentType from '../../../types/paymentType';

interface LocationPaymentType {
  state: PaymentType;
}

const SuccessfulPaymentPage = () => {
  const location = useLocation() as unknown as LocationPaymentType;
  const { lang } = useContext(CurrentLanguageContext);

  if (location.state === null) {
    window.location.href = '/';
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className="shadow-lg mt-2 d-flex flex-column w-75">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="mt-4 mb-2"
          color="green"
          size="5x"
        />
        <p className="text-success text-center fs-3 mt-0 mb-2">
          {lang.cart.successfulPaymentPage.title}
        </p>
        <div className="p-5 text-wrap text-break">
          <DataSplitBetween
            textData={getPaymentInfoHTMLFields(lang, location)}
          />
          <div className="d-flex flex-column my-2 flex-lg-row justify-content-between">
            <p className="m-0 my-3 fs-4">
              {lang.cart.successfulPaymentPage.amountPayed}
            </p>
            <p className="m-0 my-3 fs-4">
              {location.state.purchase_units[0].amount.value} $
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SuccessfulPaymentPage;
