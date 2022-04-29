import React, { FC } from 'react';

import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';
import CustomRating from './CustomRating';
import FavouriteBtn from './favouriteButton/FavouriteBtn';

interface Props {
	product: Product;
}

const ProductCardImg = styled.img`
	width: 200px;
	height: 200px;
	object-fit: contain;
`;

const ProductCardBody = styled.div`
	transition: 0.5s ease-in-out;
	:hover {
		/* box-shadow: 5px 5px 5px lightgray; */
		box-shadow: 0px 5px 5px 0px lightgray;
		transform: translateY(-0.2em);
	}
`;

const ProductCard: FC<Props> = ({ product }) => {
  return (
		<ProductCardBody>
			<Card style={{ border: 'none' }}>
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
						<FavouriteBtn productID={product.id}/>
					</div>
					<Card.Title>
						{product.title}
					</Card.Title>
					<CustomRating
						initialValue={product.rating.rate}
						size={20}
						className='mb-2'
					/>
					<Card.Text>
					{product.price.toFixed(2)} $
					</Card.Text>
				</Card.Body>
			</Card>
		</ProductCardBody>
  );
};

export default ProductCard;
