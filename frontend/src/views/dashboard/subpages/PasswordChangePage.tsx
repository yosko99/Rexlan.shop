import React from 'react';

import { Row, Col } from 'react-bootstrap';

import PasswordChangeForm from '../../../components/forms/PasswordChangeForm';

const PasswordChangePage = () => {
  return (
		<div>
      <p className='fs-3 my-3'>Password change</p>
      <p>Here you can change your password</p>
      <hr/>
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
