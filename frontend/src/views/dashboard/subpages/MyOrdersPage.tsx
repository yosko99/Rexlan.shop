import React from 'react';

import { Image } from 'react-bootstrap';

import pageUnderConstructionImg from '../../../assets/global/page-under-construction.webp';
import CenteredItems from '../../../styles/CenteredItems';

const MyOrdersPage = () => {
  return (
    <CenteredItems flexColumn>
      <Image src={pageUnderConstructionImg} fluid/>
      <p className='fs-3'>This page is under construction</p>
      <p className='fs-5 text-muted'>We are working on it!</p>
    </CenteredItems>
  );
};

export default MyOrdersPage;
