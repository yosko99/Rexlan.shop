import React, { useContext } from 'react';

import { NavDropdown, Dropdown } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const LanguageSwticher = () => {
  const { lang, setCurrentLanguage } = useContext(CurrentLanguageContext);

  return (

        <NavDropdown id="dropdown-basic-button" title={lang.header.languageSwitcherButton} onSelect={(e) => {
          setCurrentLanguage(e as string);
        }}>
            <Dropdown.Item eventKey="bg">Български</Dropdown.Item>
            <Dropdown.Item eventKey="en">English</Dropdown.Item>
        </NavDropdown>
  );
};

export default LanguageSwticher;
