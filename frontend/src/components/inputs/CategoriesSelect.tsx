/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { ProductStructure } from '../../data/inputStructure/productStructure';
import useFetch from '../../hooks/useFetch';
import { getCategoriesRoute } from '../../services/apiRoutes';
import Category from '../../types/categoryType';
import Loading from '../loading/Loading';

interface Props {
  currentProduct?: ProductStructure;
}

const CategoriesSelect: FC<Props> = ({ currentProduct }) => {
  const {
    data: categories,
    isLoading,
    error
  } = useFetch('categories', getCategoriesRoute(), true);

  const { lang } = useContext(CurrentLanguageContext);

  if (currentProduct === undefined) {
    currentProduct = {
      category: '',
      categoryURL: '',
      description: '',
      image: '',
      inputs: {},
      price: 0,
      title: ''
    };
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <div className="mb-3">
      <Form.Label>{lang.global.categories}</Form.Label>
      <Form.Select
        name="category"
        defaultValue={
          currentProduct.title === '' ? 'DEFAULT' : currentProduct.categoryURL
        }
        required
        aria-label="category"
      >
        {currentProduct.title === '' ? ( // Not provided current product
          <>
            <option value="DEFAULT"></option>
            {categories.map((category: Category, index: number) => (
              <option key={index} value={category.categoryURL}>
                {category.name}
              </option>
            ))}
          </>
        ) : (
          categories.map(
            (
              category: Category,
              index: number // With provided current product
            ) =>
              category.categoryURL === currentProduct!.categoryURL ? (
                <option
                  key={currentProduct!.categoryURL}
                  selected
                  value={currentProduct!.categoryURL}
                >
                  {currentProduct!.category}
                </option>
              ) : (
                <option key={index} value={category.categoryURL}>
                  {category.name}
                </option>
              )
          )
        )}
      </Form.Select>
      {categories.length === 0 && (
        <div className="d-flex mt-2">
          <p className="text-danger">
            Currently there are no created categories!
          </p>
          <span>
            <FontAwesomeIcon color="red" className="ms-2" icon={faWarning} />
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoriesSelect;
