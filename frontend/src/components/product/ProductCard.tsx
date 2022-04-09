import React, { FC } from 'react';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import Rating from 'react-rating';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
	product: Product;
}

const ProductCardImg = styled.img`
	width: 200px;
	height: 200px;
	object-fit: contain;
`;

const ProductCard: FC<Props> = ({ product }) => {
  return (
	<Card>
		<CenteredItems>
			<LinkContainer to={`/${product.category}/product/${product.id}`} role='button'>
				<ProductCardImg src={product.image} />
			</LinkContainer>
		</CenteredItems>
		<Card.Body>
			<div className='d-flex justify-content-between'>
				<small>
					{product.category}
				</small>
				<FontAwesomeIcon color='red' border icon={faHeart} />
			</div>
			<Card.Title>
				{product.title}
			</Card.Title>
			<Rating
  			initialRating={product.rating.rate}
				fractions={2}
			/>
			<Card.Text>
			 {product.price.toFixed(2)} $
			</Card.Text>
		</Card.Body>
	</Card>
  );
};

export default ProductCard;
