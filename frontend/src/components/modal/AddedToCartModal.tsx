import React, { FC, useContext } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ASSET_PROXY_URL } from '../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { Product } from '../../types/productTypes';
import CustomModal from '../utils/CustomModal';

interface Props {
  onClick?: () => void;
  product: Product;
  productQuantity: number;
}

const AddedToCartModal: FC<Props> = ({
  onClick,
  product,
  productQuantity
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <>
      <CustomModal
        activateButtonText={lang.global.addToCart}
        activateButtonClassName="fs-5 text-uppercase bg-black text-white"
        activateButtonOnClick={onClick}
        modalHeader={
          <>
            <FontAwesomeIcon icon={faCheck} className="me-2" color="green"/>
            {lang.pdp.addToCartModal.header}
          </>
        }
        modalBody={
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Image fluid src={ASSET_PROXY_URL + product.image}/>
            </Col>
            <Col>
              <p className="text-uppercase text-muted mt-2">
                {product.category}
              </p>
              <p>{product.title}</p>
              <p>
                {lang.pdp.addToCartModal.productID}: {product.id}
              </p>
              <p>
                {lang.pdp.addToCartModal.addedQuantity}: {productQuantity}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                officia voluptatibus ad molestias cum commodi voluptates dolore.
              </p>
            </Col>
          </Row>
        }
        modalFooter={
          <>
            <div>
              <Button variant="outline-secondary">
                {lang.pdp.addToCartModal.continueShopping}
              </Button>
            </div>
            <LinkContainer to="/cart">
              <Button variant="primary">
                {lang.pdp.addToCartModal.finishThePurchase}
              </Button>
            </LinkContainer>
          </>
        }
      />
    </>
  );
};

export default AddedToCartModal;
