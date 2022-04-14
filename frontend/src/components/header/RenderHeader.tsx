import React, { FC } from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loading from '../loading/Loading';
import FavouriteCounter from '../partials/FavouriteCounter';
import SearchBar from '../partials/SearchBar';

interface CategoryData {
	name: string;
}

interface Props {
	categories: CategoryData[];
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
						  : categories.map((category: CategoryData, index: number) => (
							<LinkContainer key={index} to={`/category/${category.name}`}>
								<NavDropdown.Item href="#action/3.1">
									{category.name}
								</NavDropdown.Item>
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
