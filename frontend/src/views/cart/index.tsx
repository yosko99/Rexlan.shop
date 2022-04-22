import React from 'react';

import Loading from '../../components/loading/Loading';
import EmptyCart from '../../components/partials/EmptyCart';
import useFetch from '../../hooks/useFetch';
import RenderCartPage from './RenderCartPage';

const CartPage = () => {
  const localStorageCart = localStorage.getItem('cart');
  const cartID = localStorageCart === null ? 'null' : localStorageCart;

  const { isLoading, data } = useFetch('cart', `/api/carts/${cartID}`);

  if (isLoading) {
    return <Loading />;
  }

  // No items in cart
  if (data.err !== undefined) {
    return <EmptyCart />;
  }

  return (
    <>
      <RenderCartPage
        products={data.products}
        defaultValues={data.defaultValues}
      />
    </>
  );
};

export default CartPage;
