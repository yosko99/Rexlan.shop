import React, { FC, useState } from 'react';

import { FormControl, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import noResultsImg from '../../assets/searchbar/no-results.png';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import CustomOffCanvas from '../offcanvas/CustomOffCanvas';
import MultipleProductCards from '../product/MultipleProductCards';

const SearchBar: FC = () => {
  const defaultSearchWord = 'Shirt';
  const [searchValue, setSearchValue] = useState<string>(defaultSearchWord);

  const {
    isLoading,
    error,
    data
  } = useFetch(
    ['searchProducts', searchValue],
    `/api/products/regex/${(searchValue === '') ? defaultSearchWord : searchValue}`
  );

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = (e.target as HTMLInputElement);

    setTimeout(() => {
      setSearchValue(value);
    }, 1000);
  };

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
                  defaultValue={searchValue}
                  aria-label="Search"
                  onChange={(e) => handleChange(e)}
                />
                {isLoading
                  ? <Loading />
                  : data.products.length === 0
                    ? <div className='d-flex flex-column justify-content-center'>
                      <Image className='mt-2 text-center' src={noResultsImg} fluid/>
                      <p className='text-center fs-4'>Sorry we couldn't find any matches for <i>{searchValue}</i></p>
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
