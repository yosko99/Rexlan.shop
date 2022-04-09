import React from 'react';

import { Image, Container } from 'react-bootstrap';

import companyLogos from '../../assets/mainpage/companies.webp';

const CompanyLogos = () => {
  return (
		<Container className='text-center'>
			<hr className='mt-5 mb-0'/>
			<Image alt='companylogos' className='w-75' fluid src={companyLogos} />
		</Container>
  );
};

export default CompanyLogos;
