import React, { FC, useState, useEffect } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

const FavouriteCounter: FC = () => {
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
		<LinkContainer to='/favourites'>
			<CenteredItems role={'button'} >
				<FontAwesomeIcon size='lg' className='py-2' icon={faHeart} color='black'/>
				<span className='text-black ps-2 pe-2'>{counter}</span>
			</CenteredItems>
		</LinkContainer>
  );
};

export default FavouriteCounter;
