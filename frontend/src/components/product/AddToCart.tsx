import React, { FC } from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';

interface MutateData {
	productID: String;
	cartID: String | null;
}

interface Props {
	productID: String;
}

const AddToCart: FC<Props> = ({ productID }) => {
  const mutation = useMutation((data) => {
    return axios.post('/api/carts', data);
  }, {
    onSuccess: (data) => {
      const cartID = data.data.cartID;
      localStorage.setItem('cart', cartID);
    }
  });

  const handleClick = () => {
    const localStorageCart = localStorage.getItem('cart');

    let cartID: String | null = null;
    if (localStorageCart !== null) {
      cartID = localStorageCart;
    }

    const mutateData: MutateData = {
      productID,
      cartID
    };

    mutation.mutate(mutateData as any);
  };

  return (
		<span role='button' onClick={handleClick} className='fs-4 text-uppercase bg-black text-white p-3'>
			Add to cart
		</span>
  );
};

export default AddToCart;
