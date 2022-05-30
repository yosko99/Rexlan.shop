import React, { FC, useState, useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import { dashboardSubpages, SubpageType } from '../../data/dashboardSubpages';
import { User } from '../../types/userTypes';

interface Props {
  user: User;
}

const RenderDashboard: FC<Props> = ({ user }) => {
  const { option } = useParams();
  const subpages = dashboardSubpages(user);
  const [subpage, setSubpage] = useState<SubpageType | undefined>(
    subpages.find((subpage) => subpage.urlParam === option));

  useEffect(() => {
    setSubpage(subpages.find(
      (subpage) => subpage.urlParam === option));
  }, [option]);

  return (
    <>
      {subpage === undefined
        ? <Navigate to={'/'} />
        : <Container>
          <p className='fs-2 my-4'>My account</p>
          <Row>
            <Col lg={2}>
              <DashboardNavigation isAdmin={user.isAdmin} />
            </Col>
            <Col lg={10} className='shadow-sm'>
              <div className='mx-3 mb-3 p-3'>
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
