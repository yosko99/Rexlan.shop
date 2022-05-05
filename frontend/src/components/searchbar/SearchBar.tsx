import React, { FC, useEffect, useState } from 'react';

import { FormControl, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import noResultsImg from '../../assets/searchbar/no-results.png';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import CustomOffCanvas from '../offcanvas/CustomOffCanvas';
import MultipleProductCards from '../product/MultipleProductCards';

const SearchBar: FC = () => {
  const defaultSearchWord = 'Shirt';
  // Input value
  const [searchTerm, setSearchTerm] = useState<string>(defaultSearchWord);
  // Value for request link (with delayed update)
  const [searchQuery, setSearchQuery] = useState<string>(defaultSearchWord);

  const {
    isLoading,
    error,
    data
  } = useFetch(
    ['searchProducts', searchQuery],
    `/api/products/regex/${(searchQuery === '') ? defaultSearchWord : searchQuery}`
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
            title='Search products'
            body={
              <>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  defaultValue={searchTerm}
                  aria-label="Search"
                  onChange={(e) => handleChange(e)}
                />
                {isLoading
                  ? <Loading />
                  : data.products.length === 0
                    ? <div className='d-flex flex-column justify-content-center'>
                      <Image className='mt-2 text-center' src={noResultsImg} fluid/>
                      <p className='text-center fs-4'>Sorry we couldn't find any matches for <i>{searchTerm}</i></p>
                    </div>
                    : <MultipleProductCards
                      isLoading={isLoading}
                      products={data.products}
                    />
                }
              </>
            }
            buttonVariant='outline-success'
            buttonText='Search products'
          />
      }
    </>
  );
};

export default SearchBar;
