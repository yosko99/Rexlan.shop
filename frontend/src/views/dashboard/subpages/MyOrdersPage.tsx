import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';

import pageUnderConstructionImg from '../../../assets/global/page-under-construction.webp';
import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import CenteredItems from '../../../styles/CenteredItems';

const MyOrdersPage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <CenteredItems flexColumn>
      <Image src={pageUnderConstructionImg} fluid />
      <p className='fs-3'>{lang.dashboard.tabs.myOrders.header.title}</p>
      <p className='fs-5 text-muted'>{lang.dashboard.tabs.myOrders.header.subtitle}</p>
    </CenteredItems>
  );
};

export default MyOrdersPage;
