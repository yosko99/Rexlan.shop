import React, { FC, useContext } from 'react';

import { Col, Row, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { Product } from '../../types/productTypes';
import calculateTotalPrice from '../../views/cart/calculateTotalPrice';
import RemoveProductFromCartButton from '../buttons/RemoveProductFromCartButton';
import DeliveryPrice from './DeliveryPrice';

interface Props {
  cartProducts: Product[];
  totalPrice: number;
  deliveryPrice: number;
}

const ProductHolder = styled.div`
  max-height: 50vh;
  min-height: 50vh;
  overflow-y: auto;
  padding: 1em;
  overflow-x: hidden;
`;

const CartOrderBox: FC<Props> = ({
  cartProducts,
  totalPrice,
  deliveryPrice
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div className="mt-2">
      <p className="fs-5">{lang.cart.orderBox.header}</p>
      <hr />
      <ProductHolder>
        {cartProducts.map((product: Product, index: number) => (
          <Row key={index}>
            <Col
              lg={3}
              sm={3}
              xs={3}
              className="d-flex justify-content-center align-items-center"
            >
              <LinkContainer
                to={`/${product.category}/product/${product.id}`}
                role="button"
              >
                <Image src={product.image} fluid alt={product.title} />
              </LinkContainer>
            </Col>
            <Col lg={9} sm={9} xs={9}>
              <p>{product.title}</p>
              <p>
                ${product.price} x {cartProducts[index].quantity}
              </p>
              <div className="d-flex justify-content-end">
                <RemoveProductFromCartButton productId={product.id} />
              </div>
            </Col>
            <hr className="my-2" />
          </Row>
        ))}
      </ProductHolder>

      <DeliveryPrice
        deliveryPrice={deliveryPrice}
        totalPriceFromProducts={calculateTotalPrice(cartProducts, 0)}
        className="mt-3"
      />

      <div className="d-flex justify-content-between">
        <p>{lang.global.discount}</p>
        <p>0 $</p>
      </div>
      <hr className="m-0 mb-2" />
      <div className="d-flex justify-content-between">
        <p className="fs-3">{lang.cart.orderBox.total}</p>
        <p className="fs-3">{totalPrice} $</p>
      </div>
    </div>
  );
};

export default CartOrderBox;
