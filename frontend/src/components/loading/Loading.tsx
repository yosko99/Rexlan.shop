import React, { FC } from 'react';

import { Spinner } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

interface Props {
  height?: string;
}

const Loading: FC<Props> = ({ height = '10vh' }) => {
  return (
    <CenteredItems style={{ height }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </CenteredItems>
  );
};

export default Loading;
