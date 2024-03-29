import React, { FC, useState } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { getCartProductsRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';
import AddedToCartModal from '../modal/AddedToCartModal';

interface MutateData {
  productId: String;
  productQuantity: number;
}

interface Props {
  product: Product;
}

const AddToCartButton: FC<Props> = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      return axios.post(
        getCartProductsRoute(localStorage.getItem('cart') as string),
        data
      );
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
    const mutateData: MutateData = {
      productId: product.id,
      productQuantity
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

export default AddToCartButton;
