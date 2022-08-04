import React, { FC, useContext } from 'react';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  isAdmin: boolean;
}

const DashboardNavigation: FC<Props> = ({ isAdmin }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const { option } = useParams();

  const buttons = [
    {
      btnText: lang.dashboard.navigationButtons.myDetails,
      urlParam: 'details'
    },
    {
      btnText: lang.dashboard.navigationButtons.passwordChange,
      urlParam: 'password-change'
    },
    {
      btnText: lang.dashboard.navigationButtons.myOrders,
      urlParam: 'orders'
    }
  ];

  return (
    <div className='d-flex flex-column'>
      {buttons.map((button, index: number) => (
        <LinkContainer key={index} to={`/dashboard/${button.urlParam}`}>
          <Button
            variant={`${option === button.urlParam ? 'success' : 'outline-success'}`}
            className='mb-3'
          >
            {button.btnText}
          </Button>
        </LinkContainer>
      ))}
      {isAdmin &&
        <LinkContainer to='/dashboard/admin-panel'>
          <Button
            variant={`${option === 'admin-panel' ? 'primary' : 'outline-primary'}`}
            className='mb-3 mt-3'
          >
            Admin panel
          </Button>
        </LinkContainer>
      }
    </div>
  );
};

export default DashboardNavigation;
