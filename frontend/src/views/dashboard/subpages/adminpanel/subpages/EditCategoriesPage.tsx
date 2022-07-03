import React from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import imgNotFoundImg from '../../../../../assets/global/image-not-found.png';
import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { categoryStructure, CategoryStructure } from '../../../../../data/dataStructure/categoryStructure';
import useFetch from '../../../../../hooks/useFetch';

const EditCategoriesPage = () => {
  const apiRoute = '/api/categories/';

  const {
    isLoading,
    data: categories
  } = useFetch('categories', apiRoute, true);

  return (
    <div>
      <p className='fs-3 my-3'>Edit categories</p>
      <p>Here you can edit category properties</p>
      <p className='text-danger'>
        <FontAwesomeIcon icon={faWarning} className='me-2' beat />
        Deleting a category will remove all products related to it.
      </p>
      <hr />
      {isLoading
        ? <Loading />
        : <EditDataTable
          createDataRoute={apiRoute}
          inputStructure={categoryStructure.inputs}
          tableHeaderCells={
            <>
              <th>Banner image</th>
              <th>Name</th>
            </>}
          tableRowCells={
            <>
              {categories.map((category: CategoryStructure, index: number) => (
                <tr key={index}>
                  <td>
                    <LinkContainer role={'button'} to={'/category/' + category.name}>
                      <Image src={category.bannerImage || imgNotFoundImg} width={100} />
                    </LinkContainer>
                  </td>
                  <td>{category.name}</td>
                  <td>
                    <EditDataIcon
                      queryKey={'category-' + category._id}
                      dataID={category._id}
                      apiRoute={apiRoute}
                      inputStructure={categoryStructure.inputs}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon
                      queryKey={'category-' + category._id}
                      apiRoute={apiRoute + category._id}
                    />
                  </td>
                </tr>
              ))}
            </>
          }
        />}
    </div>
  );
};

export default EditCategoriesPage;
