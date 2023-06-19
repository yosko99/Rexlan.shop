/* eslint-disable multiline-ternary */
import React, { FC, useState, useEffect, useContext } from 'react';

import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import logo from '../../assets/header/logo192.png';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { LayoutContext } from '../../context/LayoutContext';
import Category from '../../types/categoryType';
import CartIcon from '../icons/header/CartIcon';
import FavouriteIcon from '../icons/header/FavouriteIcon';
import LoginIcon from '../icons/header/LoginIcon';
import ProfileIcon from '../icons/header/ProfileIcon';
import Loading from '../loading/Loading';
import SearchBar from '../searchbar/SearchBar';
import LanguageSwticher from './LanguageSwticher';

interface Props {
  categories: Category[];
  isLoading: boolean;
}

const RenderHeader: FC<Props> = ({ categories, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { lang } = useContext(CurrentLanguageContext);
  const { layout } = useContext(LayoutContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsExpanded((expanded) => {
      return !expanded;
    });
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [navigate]);

  return (
    <Navbar
      expanded={isExpanded}
      expand='lg'
      bg='white'
      className='shadow-sm p-2'
      variant='light'
    >
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand href='#home'>
            <Image src={layout!.logoURL} width={40} className='me-2' fluid />
            {layout.title}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          onClick={handleClick}
        />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link>
              <LinkContainer to='/'>
                <p className='m-0'>{lang.header.homeButton}</p>
              </LinkContainer>
            </Nav.Link>
            <NavDropdown
              title={lang.global.categories}
              id='collasible-nav-dropdown'
            >
              {isLoading ? (
                <Loading />
              ) : categories.length !== 0 ? (
                categories.map((category: Category, index: number) => (
                  <LinkContainer
                    key={index}
                    to={`/category/${category.categoryURL}`}
                  >
                    <NavDropdown.Item>{category.name}</NavDropdown.Item>
                  </LinkContainer>
                ))
              ) : (
                <NavDropdown.Item className='disabled'>
                  {lang.header.noCategories}
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Link>
              <LinkContainer to='/contacts'>
                <p className='m-0'>{lang.global.contacts}</p>
              </LinkContainer>
            </Nav.Link>
            <LanguageSwticher />
          </Nav>
          <Nav className='d-flex justify-content-center'>
            <div className='d-flex flex-wrap justify-content-center'>
              <LoginIcon />
              <ProfileIcon />
              <FavouriteIcon />
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
