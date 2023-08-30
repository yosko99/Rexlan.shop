import React, { FC } from 'react';

import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ASSET_PROXY_URL } from '../../constants/apiRouteConstants';
import CenteredItems from '../../styles/CenteredItems';
import ProductCardBody from '../../styles/product/ProductCardBody';
import ProductCardImg from '../../styles/product/ProductCardImg';
import { Product } from '../../types/productTypes';
import FavoriteProductButton from '../buttons/FavoriteProductButton';
import CustomRating from './CustomRating';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <ProductCardBody>
      <Card style={{ border: 'none' }}>
        <CenteredItems>
          <LinkContainer
            to={`/${product.category}/product/${product.id}`}
            role="button"
          >
            <ProductCardImg src={ASSET_PROXY_URL + product.image}/>
          </LinkContainer>
        </CenteredItems>
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <small>{product.category}</small>
            <FavoriteProductButton productID={product.id}/>
          </div>
          <Card.Title>{product.title}</Card.Title>
          <CustomRating
            product={product}
            readonly
            starSize={20}
            className="mb-2"
          />
          <Card.Text>{product.price.toFixed(2)} $</Card.Text>
        </Card.Body>
      </Card>
    </ProductCardBody>
  );
};

export default ProductCard;
