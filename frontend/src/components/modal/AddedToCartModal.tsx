import React, { useState, FC } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { Product } from '../../types/productTypes';

interface Props {
	onClick?: () => void;
  product: Product;
  productQuantity: number;
}

const AddedToCartModal: FC<Props> = ({ onClick, product, productQuantity }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    handleShow();
    onClick && onClick();
  };

  return (
    <>
      <Button className='fs-4 text-uppercase bg-black text-white' onClick={handleClick}>
        Add to cart
      </Button>

      <Modal centered animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>
						<FontAwesomeIcon icon={faCheck} className='me-2' color='green'/>
						Product added to cart
					</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <div>
            <Button variant="outline-secondary" onClick={handleClose}>
              Continue shopping
            </Button>
          </div>
          <LinkContainer to='/cart'>
            <Button variant="primary" onClick={handleClose}>
              Finish the purchase
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddedToCartModal;
