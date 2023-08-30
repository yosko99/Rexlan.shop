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
import { ASSET_PROXY_URL } from '../../../../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../../../../context/CurrentLanguageContext';
import { categoryStructure, CategoryStructure } from '../../../../../data/inputStructure/categoryStructure';
import useFetch from '../../../../../hooks/useFetch';
import { getCategoriesRoute, getCategoryRoute } from '../../../../../services/apiRoutes';

const EditCategoriesPage = () => {
  const {
    isLoading,
    data: categories
  } = useFetch(
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
        <FontAwesomeIcon icon={faWarning} className="me-2" beat/>
        {lang.dashboard.tabs.adminPanel.editCategories.header.secondSubtitle}
      </p>
      <hr/>
      {isLoading ? (
        <Loading/>
      ) : (
        <EditDataTable
          sendFormData
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
                      to={'/category/' + category.title}
                    >
                      <Image
                        src={ASSET_PROXY_URL + category.bannerImage || imgNotFoundImg}
                        width={100}
                      />
                    </LinkContainer>
                  </td>
                  <td>{category.title}</td>
                  <td>
                    <EditDataIcon
                      queryKey={'category-' + category.id}
                      apiRoute={getCategoryRoute(category.id)}
                      inputStructure={categoryStructure.inputs[lang.current]}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon
                      queryKey={'category-' + category.id}
                      apiRoute={getCategoryRoute(category.id)}
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
