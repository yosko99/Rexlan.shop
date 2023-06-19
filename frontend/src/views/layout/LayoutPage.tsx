import React from 'react';

import { Image } from 'react-bootstrap';

import LayoutImageURL from '../../assets/global/layout.png';
import CenteredItems from '../../styles/CenteredItems';

const LayoutPage = () => {
  return (
    <CenteredItems>
      <Image src={LayoutImageURL} fluid />
    </CenteredItems>
  );
};

export default LayoutPage;
