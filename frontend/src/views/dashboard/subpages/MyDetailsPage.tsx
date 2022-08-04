import React, { FC, useContext } from 'react';

import { Col, Row } from 'react-bootstrap';

import DetailsUpdateForm from '../../../components/forms/DetailsUpdateForm';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import { User } from '../../../types/userTypes';

interface Props {
  user: User;
}

const MyDetailsPage: FC<Props> = ({ user }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div>
      <p className='fs-3 my-3'>{lang.dashboard.tabs.myDetails.header.title}</p>
      <p>{lang.dashboard.tabs.myDetails.header.subtitle}</p>
      <hr />
      <Row>
        <Col lg={4}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellendus, mollitia reprehenderit excepturi deserunt odit nemo illo incidunt!</p>
        </Col>
        <Col lg={8}>
          <DetailsUpdateForm user={user} />
        </Col>
      </Row>
      <div className='d-flex justify-content-end my-3'>
        <p className='text-muted'>{lang.dashboard.tabs.myDetails.lastProfileUpdate}: {user.updatedAt}</p>
      </div>
    </div>
  );
};

export default MyDetailsPage;
