import React, { FC } from 'react';

import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import logo from '../../assets/header/logo192.png';
import CartIcon from '../icons/CartIcon';
import FavouriteCounter from '../icons/FavouriteCounter';
import LoginIcon from '../icons/LoginIcon';
import ProfileIcon from '../icons/ProfileIcon';
import Loading from '../loading/Loading';
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
		<Navbar collapseOnSelect expand="lg" bg="white" className='shadow-sm p-2' variant="light">
			<Container>
				<LinkContainer to={'/'}>
					<Navbar.Brand href="#home">
						<Image src={logo} width={40} className='me-2' fluid/>
							Rexlan
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link>
							<LinkContainer to="/">
								<p className='m-0'>Home</p>
							</LinkContainer>
						</Nav.Link>
						<NavDropdown title="Categories" id="collasible-nav-dropdown">
							{isLoading
							  ? <Loading />
							  : categories.map((category: CategoryData, index: number) => (
								<LinkContainer key={index} to={`/category/${category.name}`}>
									<NavDropdown.Item>
										{category.name}
									</NavDropdown.Item>
								</LinkContainer>
							  ))
							}
						</NavDropdown>
						<Nav.Link>
							<LinkContainer to="/contacts">
								<p className='m-0'>Contacts</p>
							</LinkContainer>
						</Nav.Link>
					</Nav>
					<Nav className='d-flex justify-content-center'>
						<div className='d-flex justify-content-center'>
							<LoginIcon />
							<ProfileIcon />
							<FavouriteCounter />
							<CartIcon />
						</div>
						<SearchBar />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
  );
};

export default RenderHeader;
