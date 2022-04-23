import React, { useEffect, useState } from 'react';

import axios from 'axios';

import EmptyCart from '../../components/cart/EmptyCart';
import Loading from '../../components/loading/Loading';
import { DefaultValues } from '../../types/orderTypes';
import { CartProductType } from '../../types/productTypes';
import RenderCartPage from './RenderCartPage';

interface ResponseData {
  err: String;
  cartProducts: CartProductType[];
  defaultValues: DefaultValues | null;
}

const CartPage = () => {
  const localStorageCart = localStorage.getItem('cart');
  const cartID = localStorageCart === null ? 'null' : localStorageCart;
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<ResponseData>({
    err: '',
    cartProducts: [],
    defaultValues: {
      phone: '',
      address: '',
      name: ''
    }
  });

  // Fetch cart items with provided cart if there is any
  useEffect(() => {
    axios.get(`/api/carts/${cartID}`).then((data) => {
      const { err, products: cartProducts, defaultValues } = data.data;
      setCartData({
        err,
        cartProducts,
        defaultValues
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  // No items in cart
  if (cartData.err !== undefined) {
    return <EmptyCart />;
  }

  return (
    <>
      <RenderCartPage
        cartProducts={cartData.cartProducts}
        defaultValues={cartData.defaultValues}
      />
    </>
  );
};

export default CartPage;
