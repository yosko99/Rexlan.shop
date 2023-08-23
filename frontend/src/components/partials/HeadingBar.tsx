import React, { FC } from 'react';

import { Container } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

interface Props {
  title: string;
  description: string;
}

const HeadingBar: FC<Props> = ({ title, description }) => {
  return (
    <Container className="mt-3">
      <CenteredItems flexColumn>
        <div className="d-flex">
          <p className="fs-3 mb-0 text-nowrap">{title}</p>
        </div>
        <p className="fs-5 text-muted text-center">{description}</p>
      </CenteredItems>
    </Container>
  );
};

export default HeadingBar;
