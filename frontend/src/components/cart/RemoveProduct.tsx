import React, { FC } from 'react';

import axios from 'axios';
import { useQueryClient } from 'react-query';

interface Props {
	productID: string;
}

const RemoveProduct: FC<Props> = ({ productID }) => {
  const queryClient = useQueryClient();

  const handleRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const productID = e.currentTarget.id;

    axios.delete('/api/carts/product', {
      data: {
        cartID: localStorage.getItem('cart'),
        productID
      }
    }).then(() => {
      queryClient.refetchQueries('cart');
    });
  };

  return (
		<small
			role='button'
			id={productID}
			className='text-muted text-right'
			onClick={(e) => handleRemove(e)}
		>
			Remove item
		</small>
  );
};

export default RemoveProduct;
