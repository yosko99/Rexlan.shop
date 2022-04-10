import React, { FC, useState, useEffect } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

const FavouriteCounter: FC = () => {
  const [counter, setCounter] = useState<number>(localStorage.length);

  useEffect(() => {
    window.addEventListener('storage', () => {
      setCounter(localStorage.length);
      console.log('test');
    });
  }, [counter]);

  return (
		<LinkContainer to='/favourites'>
			<CenteredItems role={'button'}>
				<FontAwesomeIcon size='2x' icon={faHeart} color='white'/>
				<span className='text-white ps-2 pe-3'>{counter}</span>
			</CenteredItems>
		</LinkContainer>
  );
};

export default FavouriteCounter;
