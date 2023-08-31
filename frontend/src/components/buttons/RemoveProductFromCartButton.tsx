import React, { FC, useContext } from 'react';

import axios from 'axios';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getCartProductRoute } from '../../services/apiRoutes';

interface Props {
  productId: string;
}

const RemoveProductFromCartButton: FC<Props> = ({ productId }) => {
  const { lang } = useContext(CurrentLanguageContext);

  const queryClient = useQueryClient();

  const handleRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const productId = e.currentTarget.id;

    axios
      .delete(
        getCartProductRoute(localStorage.getItem('cart') as string, productId)
      )
      .then((_response) => {
        toast(lang.toasts.removeProductFromCartButton.productRemovedFromCart, { type: 'info' });
        queryClient.refetchQueries('cart');
      });
  };

  return (
    <small
      role="button"
      id={productId}
      className="text-danger text-right"
      onClick={(e) => handleRemove(e)}
    >
      {lang.cart.orderBox.removeProduct}
    </small>
  );
};

export default RemoveProductFromCartButton;
