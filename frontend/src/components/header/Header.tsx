import React, { FC } from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navigate } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import SearchBar from './SearchBar';

const Header: FC = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', 'https://fakestoreapi.com/products/categories');

  return (
		<>
			{error !== undefined && (
          <Navigate to="/404" state={{ error: error.message }} />
			)}
		<Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
			<Container>
				<LinkContainer to={'/'}>
					<Navbar.Brand href="#home">
						Rexlan E-Commerce
					</Navbar.Brand>
				</LinkContainer>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<NavDropdown title="Categories" id="collasible-nav-dropdown">
						{isLoading
						  ? <Loading />
						  : categories.map((category: string) => (
							<LinkContainer key={category} to={`/category/${category}`}>
								<NavDropdown.Item href="#action/3.1">{category}</NavDropdown.Item>
							</LinkContainer>
						  ))
						}
					</NavDropdown>
				</Nav>
				<Nav>
					<SearchBar />
				</Nav>
			</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
  );
};

export default Header;
