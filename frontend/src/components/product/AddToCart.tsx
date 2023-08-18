import React, { FC, useState } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { getCartsRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';
import AddedToCartModal from '../modal/AddedToCartModal';

interface MutateData {
  productId: String;
  productQuantity: number;
  cartId: String | null;
}

interface Props {
  product: Product;
}

const AddToCart: FC<Props> = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      return axios.post(getCartsRoute(), data);
    },
    {
      onSuccess: (data) => {
        const cartId = data.data.cartId;
        localStorage.setItem('cart', cartId);

        queryClient.refetchQueries('cart');
      }
    }
  );

  // Check if there is cart ID in local storage and update cart
  const handleClick = () => {
    const localStorageCart = localStorage.getItem('cart');

    let cartId: String | null = null;

    if (localStorageCart !== null) {
      cartId = localStorageCart;
    }

    const mutateData: MutateData = {
      productId: product.id,
      productQuantity,
      cartId: cartId
    };

    mutation.mutate(mutateData as any);
  };

  return (
    <div className="d-flex">
      <AddedToCartModal
        onClick={handleClick}
        productQuantity={productQuantity}
        product={product}
      />
      <input
        className="ms-3 input-group-text"
        style={{ width: '75px' }}
        min={1}
        value={productQuantity}
        type="number"
        onChange={(e) => setProductQuantity(Number(e.target.value))}
      />
    </div>
  );
};

export default AddToCart;
