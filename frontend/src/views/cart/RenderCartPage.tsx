import React, { FC, useState, useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import CartOrderBox from '../../components/cart/CartOrderBox';
import AddressInput from '../../components/inputs/AddressInput';
import CityInput from '../../components/inputs/CityInput';
import DeliveryInput from '../../components/inputs/DeliveryInput';
import NameInput from '../../components/inputs/NameInput';
import PhoneInput from '../../components/inputs/PhoneInput';
import ZipInput from '../../components/inputs/ZipInput';
import Loading from '../../components/loading/Loading';
import FormTemplate from '../../components/templates/FormTemplate';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { getProductRoute } from '../../services/apiRoutes';
import { DefaultValues } from '../../types/orderTypes';
import { CartProductType } from '../../types/productTypes';
import calculateTotalPrice from './calculateTotalPrice';

interface Props {
  cartProducts: CartProductType[];
  defaultValues: DefaultValues | null;
}

interface QueryAttributes {
  queryKey: string;
  link: string;
}

const RenderCartPage: FC<Props> = ({ cartProducts, defaultValues }) => {
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const { lang } = useContext(CurrentLanguageContext);

  const queries: QueryAttributes[] = cartProducts.map((product) => {
    return {
      queryKey: `product-${product.productID}`,
      link: getProductRoute(product.productID)
    };
  });

  // Fetch product information for cart items
  const { data: products, isLoading, error } = useMultipleFetch(queries);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error !== undefined
        ? <Navigate to="/404" state={{ error: error.message }} />
        : (
          <Container className='mt-3 shadow-lg rounded p-4'>
            <p className='fs-2'>{lang.cart.header}</p>
            <Row>
              <Col lg={8} md={8} sm={12}>
                <FormTemplate
                  className='pe-lg-5'
                  mutateURL=''
                  inputs={
                    <>
                      <DeliveryInput setDeliveryPrice={setDeliveryPrice} />
                      <NameInput defaultValue={defaultValues !== null ? defaultValues.name : ''} />
                      <AddressInput defaultValue={defaultValues !== null ? defaultValues.address : ''} />
                      <CityInput />
                      <ZipInput defaultValue={defaultValues !== null ? defaultValues.zipcode : ''} />
                      <PhoneInput defaultValue={defaultValues !== null ? defaultValues.phone : ''} />
                    </>
                  }
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <CartOrderBox
                  deliveryPrice={deliveryPrice}
                  products={products}
                  cartProducts={cartProducts}
                  totalPrice={calculateTotalPrice(products, cartProducts, deliveryPrice)}
                />
              </Col>
            </Row>
          </Container>
          )
      }
    </>
  );
};

export default RenderCartPage;
