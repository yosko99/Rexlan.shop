import React, { FC, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import CartOrder from '../../components/cart/CartOrder';
import AddressInput from '../../components/inputs/AddressInput';
import CityInput from '../../components/inputs/CityInput';
import NameInput from '../../components/inputs/NameInput';
import PhoneInput from '../../components/inputs/PhoneInput';
import ZipInput from '../../components/inputs/ZipInput';
import Loading from '../../components/loading/Loading';
import FormTemplate from '../../components/partials/FormTemplate';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { DefaultValues, OrderData } from '../../types/orderTypes';
import { CartProductType } from '../../types/productTypes';

interface Props {
  cartProducts: CartProductType[] ;
  defaultValues: DefaultValues | null;
}

interface QueryAttributes {
  queryKey: string;
  link: string;
}

const RenderCartPage: FC<Props> = ({ cartProducts, defaultValues }) => {
  const [formData, setFormData] = useState<OrderData>({
    phone: '',
    address: '',
    name: ''
  });
  const queries: QueryAttributes[] = cartProducts.map((product) => {
    return {
      queryKey: `product-${product.productID}`,
      link: `/api/products/${product.productID}`
    };
  });

  // Fetch product information for cart items
  const { data: productsData, isLoading, error } = useMultipleFetch(queries);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    {error !== undefined
      ? <Navigate to="/404" state={{ error: error.message }} />
      : (
        <Container className='mt-3 shadow-lg rounded p-4'>
          <p className='fs-2'>Shopping cart</p>
          <Row>
            <Col lg={8} md={8} sm={12}>
              <FormTemplate
                className='pe-lg-5'
                mutateURL='/api/orders/'
                inputs={
                  <>
                    <NameInput defaultValue={defaultValues !== null ? defaultValues.name : ''} />
                    <AddressInput defaultValue={defaultValues !== null ? defaultValues.address : ''} />
                    <CityInput />
                    <ZipInput />
                    <PhoneInput defaultValue={defaultValues !== null ? defaultValues.phone : ''} />
                  </>
                }
                setData={setFormData}
                data={formData}
              />
            </Col>
            <Col lg={4} md={4} sm={12}>
              <CartOrder
                products={productsData}
                cartProducts={cartProducts}
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
