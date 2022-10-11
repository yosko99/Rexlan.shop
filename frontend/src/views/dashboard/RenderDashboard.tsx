import React, { FC, useState, useEffect, useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

import DashboardNavigation from '../../components/dashboard/DashboardNavigation';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { dashboardSubpages, SubpageType } from '../../data/dashboardSubpages';
import { User } from '../../types/userTypes';

interface Props {
  user: User;
}

const RenderDashboard: FC<Props> = ({ user }) => {
  const subpages = dashboardSubpages(user);
  const { lang } = useContext(CurrentLanguageContext);
  const { option: selectedDashboardTab } = useParams();

  const [subpage, setSubpage] = useState<SubpageType | undefined>(
    subpages.find((subpage) => subpage.urlParam === selectedDashboardTab
    )
  );

  useEffect(() => {
    setSubpage(subpages.find(
      (subpage) => subpage.urlParam === selectedDashboardTab));
  }, [selectedDashboardTab]);

  return (
    <>
      {subpage === undefined
        ? <Navigate to={'/'} />
        : <Container>
          <p className='fs-2 my-4'>{lang.dashboard.myAccount}</p>
          <Row>
            <Col lg={2}>
              <DashboardNavigation isAdmin={user.isAdmin} />
            </Col>
            <Col lg={10} className='shadow-sm'>
              <div className='mx-3 mb-3 p-lg-3 p-0'>
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
