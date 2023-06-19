import React, { useContext } from 'react';

import { Row, Col } from 'react-bootstrap';

import PasswordChangeForm from '../../../components/forms/PasswordChangeForm';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';

const PasswordChangePage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div>
      <p className='fs-3 my-3'>{lang.dashboard.tabs.passwordChange.header.title}</p>
      <p>{lang.dashboard.tabs.passwordChange.header.subtitle}</p>
      <hr />
      <Row>
        <Col lg={4}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellendus, mollitia reprehenderit excepturi deserunt odit nemo illo incidunt!</p>
        </Col>
        <Col lg={8}>
          <PasswordChangeForm />
        </Col>
      </Row>
    </div>
  );
};

export default PasswordChangePage;
