/* eslint-disable multiline-ternary */
import React, { FC, useState, useContext, useRef } from 'react';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CartOrderBox from '../../components/cart/CartOrderBox';
import AddressInput from '../../components/inputs/AddressInput';
import CityInput from '../../components/inputs/CityInput';
import DeliveryInput from '../../components/inputs/DeliveryInput';
import NameInput from '../../components/inputs/NameInput';
import PhoneInput from '../../components/inputs/PhoneInput';
import ZipInput from '../../components/inputs/ZipInput';
import { FREE_DELIVERY_PRICE } from '../../constants/prices';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import convertFormInputToObject from '../../functions/convertFormInputToObject';
import { DefaultValues } from '../../types/orderTypes';
import { Product } from '../../types/productTypes';
import calculateTotalPrice from './calculateTotalPrice';

interface Props {
  cartProducts: Product[];
  defaultValues: DefaultValues | null;
}

const RenderCartPage: FC<Props> = ({ cartProducts, defaultValues }) => {
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const { lang } = useContext(CurrentLanguageContext);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    navigate('/payment', {
      state: {
        orderInfo: convertFormInputToObject(formRef),
        products: cartProducts,
        totalPrice: calculateTotalPrice(cartProducts, deliveryPrice)
      }
    });
  };

  return (
    <>
      <Container className="mt-3 shadow-lg rounded p-4">
        <p className="fs-2">{lang.cart.header}</p>
        <Row>
          <Col lg={8} md={8} sm={12}>
            <Form ref={formRef} className="pe-lg-5" onSubmit={handleSubmit}>
              <DeliveryInput setDeliveryPrice={setDeliveryPrice} />
              <input
                type="number"
                name="deliveryPrice"
                readOnly
                className="d-none"
                value={
                  calculateTotalPrice(cartProducts, deliveryPrice) >=
                  FREE_DELIVERY_PRICE
                    ? 0
                    : deliveryPrice
                }
              />
              <NameInput
                defaultValue={defaultValues !== null ? defaultValues.name : ''}
              />
              <AddressInput
                defaultValue={
                  defaultValues !== null ? defaultValues.address : ''
                }
              />
              <CityInput />
              <ZipInput
                defaultValue={
                  defaultValues !== null ? defaultValues.zipcode : ''
                }
              />
              <PhoneInput
                defaultValue={defaultValues !== null ? defaultValues.phone : ''}
              />
              <Button className="w-100" variant="outline-primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <CartOrderBox
              deliveryPrice={deliveryPrice}
              cartProducts={cartProducts}
              totalPrice={calculateTotalPrice(cartProducts, deliveryPrice)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RenderCartPage;
