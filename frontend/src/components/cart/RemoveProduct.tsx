import React, { FC, useContext } from 'react';

import axios from 'axios';
import { useQueryClient } from 'react-query';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  productID: string;
}

const RemoveProduct: FC<Props> = ({ productID }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const queryClient = useQueryClient();

  const handleRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const productID = e.currentTarget.id;

    axios.delete('/api/carts/product', {
      data: {
        cartID: localStorage.getItem('cart'),
        productID
      }
    }).then(() => {
      queryClient.refetchQueries('cart');
    });
  };

  return (
    <small
      role='button'
      id={productID}
      className='text-danger text-right'
      onClick={(e) => handleRemove(e)}
    >
      {lang.cart.orderBox.removeProduct}
    </small>
  );
};

export default RemoveProduct;
