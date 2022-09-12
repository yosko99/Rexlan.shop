import React from 'react';

import EmptyCart from '../../components/cart/EmptyCart';
import Loading from '../../components/loading/Loading';
import { getCartRoute } from '../../hooks/apiRoutes';
import useFetch from '../../hooks/useFetch';
import RenderCartPage from './RenderCartPage';

const CartPage = () => {
  const localStorageCart = localStorage.getItem('cart');
  const cartID = localStorageCart === null ? 'null' : localStorageCart;

  // Fetch cart items with provided cart if there is any
  const { data, isLoading } = useFetch(
    ['cart', cartID],
    getCartRoute(cartID),
    true
  );

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
        cartProducts={data.products}
        defaultValues={data.defaultValues}
      />
    </>
  );
};

export default CartPage;
