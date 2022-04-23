import React, { FC } from 'react';

interface Props {
	totalPrice: number;
	className?: string;
}

const DeliveryPrice: FC<Props> = ({ totalPrice, className }) => {
  return (
		<div className={`d-flex justify-content-between ${className}`}>
			<p>Delivery</p>
			<div className='d-flex'>
				{totalPrice > 99
				  ? <p>
					<del className='text-muted me-2'>$20</del>
					FREE
				</p>
				  : { totalPrice }}
			</div>
		</div>
  );
};

export default DeliveryPrice;
