import React, { useState, FC, useContext } from 'react';

import { Image, Form, ButtonGroup, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getDeliveriesRoute } from '../../hooks/apiRoutes';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';

interface Delivery {
	title: string;
	initialPrice: number;
	priceToAddress: number;
	image: string;
}

interface Props {
	setDeliveryPrice: React.Dispatch<React.SetStateAction<number>>;
}

const DeliveryInput: FC<Props> = ({ setDeliveryPrice }) => {
  const [additionalPriceToDeliver, setAdditionalPriceToDeliver] = useState<number>(0);
  const [chosenDelivery, setChosenDelivery] = useState<Delivery | null>(null);
  const { lang } = useContext(CurrentLanguageContext);

  const {
    isLoading,
    data: deliveries,
    error
  } = useFetch('deliveries', getDeliveriesRoute(), true);

  if (isLoading) {
    return <Loading />;
  }

  const handleSelectVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdditionalPriceToDeliver(0);

    // Selected blank delivery
    if (e.target.value === '') {
      setChosenDelivery(null);
    } else {
      const selectedDelivery: Delivery = deliveries
        .find((delivery: Delivery) => delivery.title === e.target.value);

      setDeliveryPrice(selectedDelivery.initialPrice);
      setChosenDelivery(selectedDelivery);
    }
  };

  const handleAdditionalDeliverPrice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const additionalPrice = Number((e.target as HTMLInputElement).value);

    setAdditionalPriceToDeliver(additionalPrice);
    setDeliveryPrice(additionalPrice + chosenDelivery!.initialPrice);
  };

  return (
		<>
			{error !== undefined
			  ? <Navigate to="/404" state={{ error: error.message }} />
			  : <div className='my-3'>

					<p className='fs-5 mt-3'>{lang.inputs.delivery.label}</p>

					{/* Selection of deliveries */}
					<Form.Select name='delivery' size='lg' required onChange={(e) => handleSelectVariant(e)} >
						<option value={''}>{lang.inputs.delivery.placeholder}</option>
						{deliveries.map((delivery: Delivery, index: number) => (
							<option key={index} value={delivery.title}>
								{delivery.title}
							</option>
						))}
					</Form.Select >
					{/* Selection of deliveries */}

					{/* Conditional render when delivery is selected */}
					{chosenDelivery !== null &&
						<>
							<Row className='d-flex mt-3'>
								<Col lg={2} sm={12} md={6} className='d-flex my-2 justify-content-center align-items-center'>
									<Image src={chosenDelivery.image} fluid alt={chosenDelivery.title} />
								</Col>
								<Col lg={10} sm={12} md={6} className='d-flex flex-column justify-content-between ps-3'>
									<p className='fs-5'>{lang.cart.deliveryBox.selectedCourier} '{chosenDelivery.title}'</p>
									<p>{lang.cart.deliveryBox.initialPriceOfDelivery} ${chosenDelivery.initialPrice}</p>
									<ButtonGroup>
										<Button
											variant={additionalPriceToDeliver === 0 ? 'primary' : 'outline-primary'}
											className='me-2 ms-0'
											onClick={(e) => handleAdditionalDeliverPrice(e)}
											value={0}>
											{lang.cart.deliveryBox.deliveryToOffice} + $0
										</Button>
										<Button
											variant={additionalPriceToDeliver === chosenDelivery.priceToAddress ? 'primary' : 'outline-primary'}
											onClick={(e) => handleAdditionalDeliverPrice(e)}
											value={chosenDelivery.priceToAddress}>
											{lang.cart.deliveryBox.deliverToAddress} + ${chosenDelivery.priceToAddress}
										</Button>
									</ButtonGroup>
								</Col>
							</Row>
						</>
					}
					{/* Conditional render when delivery is selected */}

				</div>
			}
		</>
  );
};

export default DeliveryInput;
