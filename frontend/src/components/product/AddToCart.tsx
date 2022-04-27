import React, { FC, useState } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { Product } from '../../types/productTypes';
import AddedToCartModal from '../modal/AddedToCartModal';

interface MutateData {
	productID: String;
  productQuantity: number;
	cartID: String | null;
}

interface Props {
	product: Product
}

const AddToCart: FC<Props> = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);
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
      productQuantity,
      cartID
    };

    mutation.mutate(mutateData as any);
  };

  return (
    <div className='d-flex'>
      <AddedToCartModal
        onClick={handleClick}
        productQuantity={productQuantity}
        product={product}
      />
      <input
        className='ms-3 input-group-text'
        style={{ width: '75px' }}
        value={productQuantity}
        type='number'
        onChange={(e) => setProductQuantity(Number(e.target.value))}
      />
    </div>
  );
};

export default AddToCart;
