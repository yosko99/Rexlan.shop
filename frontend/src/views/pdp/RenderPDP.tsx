import React, { FC } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import FreeShippingBar from '../../components/partials/FreeShippingBar';
import FavouriteBtn from '../../components/product/FavouriteBtn';
import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
	product: Product;
}

const ProductImage = styled.img`
	height: 80%;
	width: 70%;
	object-fit: contain;
`;

const RenderPDP: FC<Props> = ({ product }) => {
  const { category } = useParams();

  return (
		<>
			<FreeShippingBar />
			<Container>
				<Row>
					<Col lg={7} className='d-flex align-items-center justify-content-center'>
						<ProductImage src={product.image} alt={product.title}/>
					</Col>
					<Col lg={5} className='d-flex align-items-center mt-4'>
						<div className='text-left'>
							<LinkContainer to={`/category/${category}`}>
								<span className='bg-black text-white p-2' role='button'>
									{product.category.toUpperCase()}
								</span>
							</LinkContainer>
							<p className='fs-2 mt-3 mb-2'>
								{product.title}
							</p>
							<p className='fs-3 mb-0'>
								$ {product.price}
							</p>
							<Rating
								className='my-2'
								initialRating={product.rating.rate}
								fractions={2}
							/>
							<p className='text-muted mb-5'>
								{product.description}
							</p>
								<span role='button' className='fs-4 text-uppercase bg-black text-white p-3'>
									Add to cart
								</span>
								<div>
									<FavouriteBtn
										size={2}
										className='mt-4'
										productID={product.id}
									/>
								</div>
							<small>
								<p className='mt-4 text-muted'>
									In stock- pickup and free shipping avaliable
								</p>
							</small>
						</div>
					</Col>
				</Row>
				<p className='text-center mt-3'>
					Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus nostrum, quia adipisci minus aut nemo temporibus eveniet quaerat iusto voluptatem dolorem corrupti illum, dolor doloremque? Quae nemo culpa reiciendis. consectetur adipisicing elit. Dolor est ea sint commodi, dolorem quia sunt, accusamus iste vel quos tempora, dolorum velit neque incidunt odio quo suscipit eum sapiente!
				</p>

			</Container>
		</>
  );
};

export default RenderPDP;
