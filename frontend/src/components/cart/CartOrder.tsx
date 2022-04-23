import React, { useEffect, FC, useMemo } from 'react';

import { Col, Row, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import { Product, CartProductType } from '../../types/productTypes';
import DeliveryPrice from './DeliveryPrice';

interface Props {
	products: Product[];
	cartProducts: CartProductType[];
}

const ProductHolder = styled.div`
	max-height: 50vh;
	min-height: 50vh;
	overflow-y: auto;
	padding: 1em;
	overflow-x: hidden;
`;

const calculateTotalPrice = (products:Product[], cartProducts: CartProductType[]): number => {
  let price = 0;

  products.forEach((product: Product, index: number) => {
    price += product.price * cartProducts[index].productQuantity;
  });

  return Number(price.toFixed(2));
};

const CartOrder: FC<Props> = ({ products, cartProducts }) => {
  const totalPrice = useMemo(() => calculateTotalPrice(products, cartProducts), [products, cartProducts]);

  useEffect(() => {

  }, [cartProducts]);
  return (
		<div className='mt-2'>
			<p className='fs-5'>Your order</p>
			<hr/>
			<ProductHolder>
				{products.map((product: Product, index: number) => (
					<Row key={index}>
						<Col lg={3} sm={3} xs={3} className='d-flex justify-content-center align-items-center'>
							<LinkContainer to={`/${product.category}/product/${product.id}`} role='button'>
								<Image src={product.image} fluid alt={product.title} />
							</LinkContainer>
						</Col>
						<Col lg={9} sm={9} xs={9} >
							<p>{product.title}</p>
							<p>${product.price} x {cartProducts[index].productQuantity}</p>
							<div className='d-flex justify-content-end'>
								<small role='button' className='text-muted text-right'>Remove item</small>
							</div>
						</Col>
						<hr className='my-2'/>
					</Row>
				))}
			</ProductHolder>
			<DeliveryPrice totalPrice={totalPrice} className='mt-3' />
			<div className='d-flex justify-content-between'>
				<p>Discount</p>
				<p>-$10</p>
			</div>
			<hr className='m-0 mb-2'/>
			<div className='d-flex justify-content-between'>
				<p className='fs-3'> Total</p>
				<p className='fs-3'> ${totalPrice}</p>
			</div>
		</div>
  );
};

export default CartOrder;
