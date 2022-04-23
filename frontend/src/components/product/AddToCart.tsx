import React, { FC } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { Product } from '../../types/productTypes';
import AddedToCartModal from '../modal/AddedToCartModal';

interface MutateData {
	productID: String;
	cartID: String | null;
}

interface Props {
	product: Product
}

const AddToCart: FC<Props> = ({ product }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => {
    return axios.post('/api/carts', data);
  }, {
    onSuccess: (data) => {
      const cartID = data.data.cartID;
      localStorage.setItem('cart', cartID);

      queryClient.refetchQueries('cart');
    }
  });

  const handleClick = () => {
    const localStorageCart = localStorage.getItem('cart');

    let cartID: String | null = null;
    if (localStorageCart !== null) {
      cartID = localStorageCart;
    }

    const mutateData: MutateData = {
      productID: product.id,
      cartID
    };

    mutation.mutate(mutateData as any);
  };

  return (
      <AddedToCartModal onClick={handleClick} product={product}/>
  );
};

export default AddToCart;
