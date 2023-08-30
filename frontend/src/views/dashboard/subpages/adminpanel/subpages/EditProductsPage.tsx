/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { ASSET_PROXY_URL } from '../../../../../constants/apiRouteConstants';
import { CurrentLanguageContext } from '../../../../../context/CurrentLanguageContext';
import { productStructure } from '../../../../../data/inputStructure/productStructure';
import useFetch from '../../../../../hooks/useFetch';
import { getProductRoute, getProductsRoute } from '../../../../../services/apiRoutes';
import { Product } from '../../../../../types/productTypes';

const EditProductsPage = () => {
  const {
    isLoading,
    data: products
  } = useFetch(
    'allProducts',
    getProductsRoute(),
    true
  );
  const { lang } = useContext(CurrentLanguageContext);

  return (
    <div>
      <p className="fs-3 my-3">
        {lang.dashboard.tabs.adminPanel.editProducts.header.title}
      </p>
      <p>{lang.dashboard.tabs.adminPanel.editProducts.header.subtitle}</p>
      <hr/>
      {isLoading ? (
        <Loading/>
      ) : (
        <EditDataTable
          sendFormData
          createDataRoute={getProductsRoute()}
          inputStructure={productStructure.inputs[lang.current]}
          tableHeaderCells={
            <>
              <th>
                {
                  lang.dashboard.tabs.adminPanel.editProducts
                    .editProductsTableCols.imageCol
                }
              </th>
              <th>
                {
                  lang.dashboard.tabs.adminPanel.editProducts
                    .editProductsTableCols.titleCol
                }
              </th>
            </>
          }
          tableRowCells={
            <>
              {products.map((product: Product, index: number) => (
                <tr key={index}>
                  <td>
                    <LinkContainer
                      role="button"
                      to={`/${product.category}/product/${product.id}`}
                    >
                      <Image src={ASSET_PROXY_URL + product.image} width={50}/>
                    </LinkContainer>
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <EditDataIcon
                      queryKey={`product-${product.id}`}
                      apiRoute={getProductRoute(product.id)}
                      inputStructure={productStructure.inputs[lang.current]}
                    />
                  </td>
                  <td>
                    <DeleteDataIcon
                      apiRoute={getProductRoute(product.id)}
                      queryKey={'product-' + product.id}
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

export default EditProductsPage;
