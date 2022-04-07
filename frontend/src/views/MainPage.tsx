import React from 'react';

import CustomCarousel from '../components/carousel/CustomCarousel';
import HeadingBar from '../components/partials/HeadingBar';
import InfoBar from '../components/partials/InfoBar';
import { textAreas } from '../data/infoBarData';

const MainPage = () => {
  return (
		<>
			<CustomCarousel/>
			<InfoBar textAreas={textAreas}/>
			<HeadingBar
				title={'Featured Products'}
				description={'Amazing products added recently in our catalog'}
			/>
		</>
  );
};

export default MainPage;
