import React from 'react';

import { Image } from 'react-bootstrap';
// @ts-ignore
import Bounce from 'react-reveal/Bounce';
import { LinkContainer } from 'react-router-bootstrap';

import emptyCartImg from '../../assets/cartpage/empty-cart.jpg';

const EmptyCart = () => {
  return (
    <Bounce>
      <div className='text-center'>
        <Image fluid src={emptyCartImg} />
        <p className='fs-3 text-muted'>I'm empty :(</p>
        <LinkContainer to='/'>
          <p role='button' className='text-underline text-success'><u>Add products to cart</u></p>
        </LinkContainer>
      </div>
    </Bounce>
  );
};

export default EmptyCart;
