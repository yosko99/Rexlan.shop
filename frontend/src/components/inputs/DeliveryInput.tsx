/* eslint-disable multiline-ternary */
import React, { useState, FC, useContext } from 'react';

import { Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useFetch from '../../hooks/useFetch';
import Delivery from '../../interfaces/delivery';
import { getDeliveriesRoute } from '../../services/apiRoutes';
import DeliveryInfo from '../delivery/DeliveryInfo';
import Loading from '../loading/Loading';

interface Props {
  setDeliveryPrice: React.Dispatch<React.SetStateAction<number>>;
}

const DeliveryInput: FC<Props> = ({ setDeliveryPrice }) => {
  const [additionalPriceToDeliver, setAdditionalPriceToDeliver] =
    useState<number>(0);
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
      const selectedDelivery: Delivery = deliveries.find(
        (delivery: Delivery) => delivery.title === e.target.value
      );

      setDeliveryPrice(selectedDelivery.initialPrice);
      setChosenDelivery(selectedDelivery);
    }
  };

  const updateDeliveryPrice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const additionalPrice = Number((e.target as HTMLInputElement).value);

    setAdditionalPriceToDeliver(additionalPrice);
    setDeliveryPrice(additionalPrice + chosenDelivery!.initialPrice);
  };

  return (
    <>
      {error !== undefined ? (
        <Navigate to="/404" state={{ error: error.message }} />
      ) : (
        <div className="my-3">
          <p className="fs-5 mt-3">{lang.inputs.delivery.label}</p>

          <Form.Select
            name="delivery"
            size="lg"
            required
            onChange={(e) => handleSelectVariant(e)}
          >
            <option value={''}>{lang.inputs.delivery.placeholder}</option>
            {deliveries.map((delivery: Delivery, index: number) => (
              <option key={index} value={delivery.title}>
                {delivery.title}
              </option>
            ))}
          </Form.Select>

          {chosenDelivery !== null && (
            <DeliveryInfo
              delivery={chosenDelivery}
              additionalPriceToDeliver={additionalPriceToDeliver}
              updateDeliveryPrice={updateDeliveryPrice}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DeliveryInput;
