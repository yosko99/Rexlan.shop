import React, { useContext } from 'react';

import { Button, ButtonGroup, Col, Image, Row } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import Delivery from '../../interfaces/delivery';

interface Props {
  delivery: Delivery;
  updateDeliveryPrice: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  additionalPriceToDeliver: number;
}

const DeliveryInfo = ({
  delivery,
  updateDeliveryPrice,
  additionalPriceToDeliver
}: Props) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <>
      <Row className="d-flex mt-3">
        <Col
          lg={2}
          sm={12}
          md={6}
          className="d-flex my-2 justify-content-center align-items-center"
        >
          <Image src={delivery.image} fluid alt={delivery.title} />
        </Col>
        <Col
          lg={10}
          sm={12}
          md={6}
          className="d-flex flex-column justify-content-between ps-3"
        >
          <p className="fs-5">
            {lang.cart.deliveryBox.selectedCourier} '{delivery.title}'
          </p>
          <p>
            {lang.cart.deliveryBox.initialPriceOfDelivery} $
            {delivery.initialPrice}
          </p>
          <ButtonGroup>
            <Button
              variant={
                additionalPriceToDeliver === 0 ? 'primary' : 'outline-primary'
              }
              className="me-2 ms-0"
              onClick={(e) => updateDeliveryPrice(e)}
              value={0}
            >
              {lang.cart.deliveryBox.deliveryToOffice} + $0
            </Button>
            <Button
              variant={
                additionalPriceToDeliver === delivery.priceToAddress
                  ? 'primary'
                  : 'outline-primary'
              }
              onClick={(e) => updateDeliveryPrice(e)}
              value={delivery.priceToAddress}
            >
              {lang.cart.deliveryBox.deliverToAddress} + $
              {delivery.priceToAddress}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
};

export default DeliveryInfo;
