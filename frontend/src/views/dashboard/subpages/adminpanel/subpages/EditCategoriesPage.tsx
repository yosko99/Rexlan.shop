/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import imgNotFoundImg from '../../../../../assets/global/image-not-found.png';
import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { CurrentLanguageContext } from '../../../../../context/CurrentLanguageContext';
import {
  categoryStructure,
  CategoryStructure
} from '../../../../../data/inputStructure/categoryStructure';
import useFetch from '../../../../../hooks/useFetch';
import {
  getCategoriesRoute,
  getCategoryRoute
} from '../../../../../services/apiRoutes';

const EditCategoriesPage = () => {
  const { isLoading, data: categories } = useFetch(
    'categories',
    getCategoriesRoute(),
    true
  );
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div>
      <p className="fs-3 my-3">
        {lang.dashboard.tabs.adminPanel.editCategories.header.title}
      </p>
      <p>{lang.dashboard.tabs.adminPanel.editCategories.header.subtitle}</p>
      <p className="text-danger">
        <FontAwesomeIcon icon={faWarning} className="me-2" beat />
        {lang.dashboard.tabs.adminPanel.editCategories.header.secondSubtitle}
      </p>
      <hr />
      {isLoading ? (
        <Loading />
      ) : (
        <EditDataTable
          createDataRoute={getCategoriesRoute()}
          inputStructure={categoryStructure.inputs[lang.current]}
          tableHeaderCells={
            <>
              <th>
                {
                  lang.dashboard.tabs.adminPanel.editCategories
                    .editCategoriesTableCols.bannerImageCol
                }
              </th>
              <th>
                {
                  lang.dashboard.tabs.adminPanel.editCategories
                    .editCategoriesTableCols.nameCol
                }
              </th>
            </>
          }
          tableRowCells={
            <>
              {categories.map((category: CategoryStructure, index: number) => (
                <tr key={index}>
                  <td>
                    <LinkContainer
                      role={'button'}
                      to={'/category/' + category.categoryURL}
                    >
                      <Image
                        src={category.bannerImage || imgNotFoundImg}
                        width={100}
                      />
                    </LinkContainer>
                  </td>
                  <td>{category.name}</td>
                  <td>
                    <EditDataIcon
                      queryKey={'category-' + category._id}
                      apiRoute={getCategoryRoute(category._id)}
                      inputStructure={categoryStructure.inputs[lang.current]}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon
                      queryKey={'category-' + category._id}
                      apiRoute={getCategoryRoute(category._id)}
                    />
                  </td>
                </tr>
              ))}
            </>
          }
        />
      )}
    </div>
  );
};

export default EditCategoriesPage;
