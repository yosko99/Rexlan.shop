import React, { FC, useContext } from 'react';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
	deliveryPrice: number;
	className?: string;
	totalPriceFromProducts: number;
}

const DeliveryPrice: FC<Props> = ({ totalPriceFromProducts, deliveryPrice = 0, className }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const freeDeliverAtPrice = 99;

  return (
		<div className={`d-flex justify-content-between ${className}`}>
			<p>{lang.global.delivery}</p>
			<div className='d-flex'>
				{totalPriceFromProducts > freeDeliverAtPrice
				  ? <p>
						<del className='text-muted me-2'>${deliveryPrice}</del>
						{lang.global.free}
					</p>
				  : <>${deliveryPrice}</>
				}
			</div>
		</div>
  );
};

export default DeliveryPrice;
