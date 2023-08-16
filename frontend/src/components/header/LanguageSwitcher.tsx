import React, { useContext } from 'react';

import { NavDropdown, Dropdown } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const LanguageSwitcher = () => {
  const { lang, setCurrentLanguage } = useContext(CurrentLanguageContext);

  return (
    <NavDropdown
      id="dropdown-basic-button"
      title={lang.header.languageSwitcherButton}
      onSelect={(e) => {
        setCurrentLanguage(e as string);
      }}
    >
      <Dropdown.Item href="/" eventKey="bg">
        Български
      </Dropdown.Item>
      <Dropdown.Item href="/" eventKey="en">
        English
      </Dropdown.Item>
      <Dropdown.Item href="/" eventKey="es">
        Español
      </Dropdown.Item>
    </NavDropdown>
  );
};

export default LanguageSwitcher;
