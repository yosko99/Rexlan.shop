import React, { FC } from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loading from '../loading/Loading';
import FavouriteCounter from '../partials/FavouriteCounter';
import SearchBar from '../partials/SearchBar';

interface Props {
	categories: string[];
	isLoading: boolean;
}

const RenderHeader: FC<Props> = ({ categories, isLoading }) => {
  return (
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
					<FavouriteCounter />
					<SearchBar />
				</Nav>
			</Navbar.Collapse>
			</Container>
		</Navbar>
  );
};

export default RenderHeader;
