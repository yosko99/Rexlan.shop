import React, { useContext } from 'react';

import { Image, Container } from 'react-bootstrap';

import { LayoutContext } from '../../context/LayoutContext';

const CompanyLogos = () => {
  const { layout } = useContext(LayoutContext);

  return (
    <Container className='text-center'>
      <hr className='mt-5 mb-0' />
      <Image
        alt='companylogos'
        className='w-75'
        fluid
        src={layout.sponsorsURL}
      />
    </Container>
  );
};

export default CompanyLogos;
