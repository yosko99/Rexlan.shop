import React, { FC, useState, useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import { User } from '../../types/userTypes';
import MyDetailsPage from './subpages/MyDetailsPage';
import MyOrdersPage from './subpages/MyOrdersPage';
import PasswordChangePage from './subpages/PasswordChangePage';

interface Props {
  user: User;
}

interface Subpage {
  urlParam: string;
  page: React.ReactChild;
}

const RenderDashboard: FC<Props> = ({ user }) => {
  const { option } = useParams();
  const subpages: Subpage[] = [
    {
      urlParam: 'details',
      page: <MyDetailsPage user={user} />
    },
    {
      urlParam: 'password-change',
      page: <PasswordChangePage />
    },
    {
      urlParam: 'orders',
      page: <MyOrdersPage />
    }
  ];
  const [subpage, setSubpage] = useState<Subpage | undefined>(subpages.find((subpage) => subpage.urlParam === option));

  useEffect(() => {
    setSubpage(subpages.find(
      (subpage) => subpage.urlParam === option));
  }, [option]);

  return (
    <>
      {subpage === undefined
        ? <Navigate to={'/'}/>
        : <Container>
        <p className='fs-2 my-4'>My account</p>
        <Row>
          <Col lg={2}>
            <DashboardNavigation />
          </Col>
          <Col lg={10} className='shadow-sm'>
            <div className='ms-3 p-3'>
              {subpage.page}
            </div>
          </Col>
        </Row>
      </Container>
    }
    </>
  );
};

export default RenderDashboard;
