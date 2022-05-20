import React, { FC } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { Product } from '../../types/productTypes';
import CustomModal from './CustomModal';

interface Props {
	onClick?: () => void;
  product: Product;
  productQuantity: number;
}

const AddedToCartModal: FC<Props> = ({ onClick, product, productQuantity }) => {
  return (
    <>
      <CustomModal
        activateButtonText='Add to cart'
        activateButtonClassName='fs-4 text-uppercase bg-black text-white'
        activateButtonOnClick={onClick}
        modalHeader={
          <>
            <FontAwesomeIcon icon={faCheck} className='me-2' color='green'/>
            Product added to cart
          </>
          }
        modalBody={
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Image fluid src={product.image} />
            </Col>
            <Col>
              <p className='text-uppercase text-muted mt-2'>{product.category}</p>
              <p>{product.title}</p>
              <p>Product ID: {product.id}</p>
              <p>Added quantity: {productQuantity}</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia voluptatibus ad molestias cum commodi voluptates dolore.</p>
            </Col>
          </Row>
          }
        modalFooter={
          <>
            <div>
              <Button variant="outline-secondary" >
                Continue shopping
              </Button>
            </div>
            <LinkContainer to='/cart'>
              <Button variant="primary" >
                Finish the purchase
              </Button>
            </LinkContainer>
          </>
        }
      />
    </>
  );
};

export default AddedToCartModal;
