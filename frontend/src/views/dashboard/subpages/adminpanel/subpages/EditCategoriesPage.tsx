import React from 'react';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navigate } from 'react-router-dom';

import imgNotFoundImg from '../../../../../assets/global/image-not-found.png';
import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { categoryStructure, CategoryStructure } from '../../../../../data/dataStructure/categoryStrucutre';
import useFetch from '../../../../../hooks/useFetch';

const EditCategoriesPage = () => {
  const apiRoute = '/api/categories/';

  const {
    isLoading,
    data: categories,
    error
  } = useFetch('allCategories', apiRoute, true);

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  return (
    <div>
      <p className='fs-3 my-3'>Edit products</p>
      <p>Here you can edit product properties</p>
      <p className='text-danger'>
        <FontAwesomeIcon icon={faWarning} className='me-2' beat />
        Deleting a category will remove all products related to it.
      </p>
      <hr />
      {isLoading
        ? <Loading />
        : <EditDataTable
          createDataRoute={apiRoute}
          dataStructure={categoryStructure}
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
                      queryKey={category.name}
                      dataID={category._id}
                      apiRoute={apiRoute}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon apiRoute={apiRoute + category._id} />
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
