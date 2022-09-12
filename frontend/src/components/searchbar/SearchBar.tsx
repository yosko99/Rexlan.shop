import React, { FC, useEffect, useState, useContext } from 'react';

import { FormControl, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import noResultsImg from '../../assets/searchbar/no-results.png';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getProductsPatternRoute } from '../../hooks/apiRoutes';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import CustomOffCanvas from '../offcanvas/CustomOffCanvas';
import MultipleProductCards from '../product/MultipleProductCards';

const SearchBar: FC = () => {
  const { lang } = useContext(CurrentLanguageContext);
  // Input value
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Value for request link (with delayed update)
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    isLoading,
    error,
    data
  } = useFetch(
    ['searchProducts', searchQuery],
    getProductsPatternRoute((searchQuery === '') ? '.*' : searchQuery),
    true
  );

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = (e.target as HTMLInputElement);
    setSearchTerm(value);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 1000);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  return (
    <>
      {error !== undefined
        ? <Navigate to="/404" state={{ error: error.message }} />
        : <CustomOffCanvas
          title={lang.searchBar.titleText}
          body={
            <>
              <FormControl
                type="search"
                placeholder={lang.searchBar.inputfieldPlaceholder}
                className="me-2"
                defaultValue={searchTerm}
                aria-label="Search"
                onChange={(e) => handleChange(e)}
              />
              {isLoading
                ? <Loading />
                : data.products.length === 0
                  ? <div className='d-flex flex-column justify-content-center'>
                    <Image className='mt-2 text-center' src={noResultsImg} fluid />
                    <p className='text-center fs-4'>{lang.searchBar.productNotFound} '<i>{searchQuery}</i>'</p>
                  </div>
                  : <MultipleProductCards
                    isLoading={isLoading}
                    products={data.products}
                  />
              }
            </>
          }
          buttonVariant='outline-success'
          buttonText={lang.searchBar.buttonText}
        />
      }
    </>
  );
};

export default SearchBar;
