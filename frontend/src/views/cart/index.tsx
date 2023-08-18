import React from 'react';

import EmptyCart from '../../components/cart/EmptyCart';
import Loading from '../../components/loading/Loading';
import useFetch from '../../hooks/useFetch';
import { getCartProductsRoute } from '../../services/apiRoutes';
import RenderCartPage from './RenderCartPage';

const CartPage = () => {
  const localStorageCart = localStorage.getItem('cart');
  const cartID = localStorageCart === null ? 'null' : localStorageCart;

  // Fetch cart items with provided cart if there is any
  const { data, isLoading } = useFetch(
    ['cart', cartID],
    getCartProductsRoute(cartID),
    cartID !== 'null'
  );

  if (isLoading) {
    return <Loading />;
  }
  if (cartID === 'null' || data.products.length === 0) {
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
