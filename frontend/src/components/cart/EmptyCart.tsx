import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';
// @ts-ignore
import Bounce from 'react-reveal/Bounce';
import { LinkContainer } from 'react-router-bootstrap';

import emptyCartImg from '../../assets/cartpage/empty-cart.jpg';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const EmptyCart = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <Bounce>
      <div className='text-center'>
        <Image fluid className='mt-4' src={emptyCartImg} />
        <p className='fs-3 text-muted'>{lang.cart.emptyCart}</p>
        <LinkContainer to='/'>
          <p role='button' className='text-underline text-success'><u>{lang.cart.addProductsToCart}</u></p>
        </LinkContainer>
      </div>
    </Bounce>
  );
};

export default EmptyCart;
