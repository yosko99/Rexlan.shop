/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import AddToCartButton from '../../components/buttons/AddToCartButton';
import FavoriteProductButton from '../../components/buttons/FavoriteProductButton';
import FreeShippingBar from '../../components/partials/FreeShippingBar';
import CustomRating from '../../components/product/CustomRating';
import MultipleProductCarousel from '../../components/product/MultipleProductCarousel';
import { ASSET_PROXY_URL } from '../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useFetch from '../../hooks/useFetch';
import { getProductsByCategoryRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';

interface Props {
  product: Product;
}

const ProductImage = styled.img`
  height: 80%;
  width: 70%;
  object-fit: contain;
`;

const RenderPDP: FC<Props> = ({
  product
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  const {
    data,
    isLoading
  } = useFetch(
    `${product.category}-products`,
    getProductsByCategoryRoute(product.category, 4),
    true
  );

  const categoryProducts = data as Product[];

  return (
    <>
      <FreeShippingBar/>
      <Container>
        <Row>
          <Col
            lg={7}
            className="d-flex align-items-center justify-content-center"
          >
            <ProductImage src={ASSET_PROXY_URL + product.image} alt={product.title}/>
          </Col>
          <Col lg={5} className="d-flex align-items-center mt-4">
            <div className="text-left">
              <LinkContainer to={`/category/${product.category}`}>
                <span className="bg-black text-white p-2" role="button">
                  {product.category.toUpperCase()}
                </span>
              </LinkContainer>
              <p className="fs-2 mt-3 mb-2">{product.title}</p>
              <p className="fs-3 mb-0">$ {product.price}</p>
              <CustomRating
                product={product}
                starSize={30}
                className="my-3"
              />
              <p className="text-muted mb-5">{product.description}</p>
              <AddToCartButton product={product}/>
              <div>
                <FavoriteProductButton
                  size={2}
                  className="mt-4"
                  productID={product.id}
                />
              </div>
              <small>
                <p className="mt-4 text-muted">{lang.pdp.inStock}</p>
              </small>
            </div>
          </Col>
        </Row>
        <p className="text-center mt-3">
          Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ab voluptatibus nostrum, quia adipisci minus aut
          nemo temporibus eveniet quaerat iusto voluptatem dolorem corrupti
          illum, dolor doloremque? Quae nemo culpa reiciendis. consectetur
          adipisicing elit. Dolor est ea sint commodi, dolorem quia sunt,
          accusamus iste vel quos tempora, dolorum velit neque incidunt odio quo
          suscipit eum sapiente!
        </p>
        <p className="fs-3 mb-4 mt-5">{lang.pdp.relatedProducts}</p>
        <MultipleProductCarousel
          products={categoryProducts}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
};

export default RenderPDP;
