import React from 'react';

import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navigate } from 'react-router-dom';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { productStructure } from '../../../../../data/dataStructure/productStructure';
import useFetch from '../../../../../hooks/useFetch';
import { Product } from '../../../../../types/productTypes';

const EditProductsPage = () => {
  const apiRoute = '/api/products/';
  const {
    isLoading,
    data: products,
    error
  } = useFetch('allProducts', '/api/products', true);

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  return (
		<div>
			<p className='fs-3 my-3'>Edit products</p>
			<p>Here you can edit product properties</p>
			<hr />
			{isLoading
			  ? <Loading />
			  : <EditDataTable
					createDataRoute={apiRoute}
					dataStructure={productStructure}
					tableHeaderCells={
						<>
							<th>Image</th>
							<th>Title</th>
						</>}
					tableRowCells={
						<>
							{products.map((product: Product, index: number) => (
								<tr key={index}>
									<td>
										<LinkContainer role='button' to={`/${product.category}/product/${product.id}`}>
											<Image src={product.image} width={50} />
										</LinkContainer>
									</td>
									<td>{product.title}</td>
									<td>
										<EditDataIcon
											queryKey={`product-${product.id}`}
											dataID={product.id}
											apiRoute={apiRoute}
										/>
									</td>
									<td>
										<DeleteDataIcon apiRoute={apiRoute + product.id} />
									</td>
								</tr>
							))}
						</>
					}
				/>}
		</div>
  );
};

export default EditProductsPage;
