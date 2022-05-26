import React, { FC } from 'react';

interface Props {
	deliveryPrice: number;
	className?: string;
	totalPriceFromProducts: number;
}

const DeliveryPrice: FC<Props> = ({ totalPriceFromProducts, deliveryPrice = 0, className }) => {
  const freeDeliverAtPrice = 99;

  return (
		<div className={`d-flex justify-content-between ${className}`}>
			<p>Delivery</p>
			<div className='d-flex'>
				{totalPriceFromProducts > freeDeliverAtPrice
				  ? <p>
						<del className='text-muted me-2'>${deliveryPrice}</del>
						FREE
					</p>
				  : <>${deliveryPrice}</>
				}
			</div>
		</div>
  );
};

export default DeliveryPrice;
