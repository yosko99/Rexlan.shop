/* eslint-disable multiline-ternary */
import React, { FC, useContext } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useFetch from '../../hooks/useFetch';
import { getCategoriesRoute } from '../../services/apiRoutes';
import Category from '../../types/categoryType';
import Loading from '../loading/Loading';

interface Props {
  defaultCategory?: string;
}

const CategoriesSelect: FC<Props> = ({ defaultCategory }) => {
  const {
    data: categories,
    isLoading,
    error
  } = useFetch('categories', getCategoriesRoute(), true);

  const { lang } = useContext(CurrentLanguageContext);

  if (isLoading) {
    return <Loading/>;
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
          defaultCategory === '' ? 'DEFAULT' : defaultCategory
        }
        required
        aria-label="category"
      >
        {defaultCategory === '' ? ( // Not provided current product
          <>
            <option></option>
            {categories.map((category: Category, index: number) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </>
        ) : (
          categories.map(
            (
              category: Category,
              index: number // With provided current product
            ) =>
              category.title === defaultCategory ? (
                <option
                  key={defaultCategory}
                  selected
                  value={defaultCategory}
                >
                  {defaultCategory}
                </option>
              ) : (
                <option key={index} value={category.title}>
                  {category.title}
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
            <FontAwesomeIcon color="red" className="ms-2" icon={faWarning}/>
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoriesSelect;
