import React, { FC, useState, useEffect, useContext } from 'react';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import CenteredItems from '../../../styles/CenteredItems';

const FavouriteIcon: FC = () => {
  const { lang } = useContext(CurrentLanguageContext);
  const [counter, setCounter] = useState<number>();

  const setCounterNumber = () => {
    const localStorageLiked = localStorage.getItem('liked');

    if (localStorageLiked === null || localStorageLiked === '') {
      setCounter(0);
    } else {
      setCounter(JSON.parse(localStorageLiked).length);
    }
  };

  useEffect(() => {
    setCounterNumber();
    window.addEventListener('storage', setCounterNumber);
  }, []);

  return (
		<LinkContainer role={'button'} className='me-3' to='/favourites'>
			<CenteredItems flexColumn>
        <div>
          <FontAwesomeIcon size='lg' className='' icon={faHeart} color='black'/>
          <span className='text-black ps-2 pe-2'>{counter}</span>
        </div>
        <small className='text-center'>{lang.header.favouritesButton}</small>
			</CenteredItems>
		</LinkContainer>
  );
};

export default FavouriteIcon;
