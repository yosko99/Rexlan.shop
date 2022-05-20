import React from 'react';

import { Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import useFetch from '../../../../../hooks/useFetch';
import { Product } from '../../../../../types/productTypes';

const EditProductsPage = () => {
  const {
    isLoading,
    data: products,
    error
  } = useFetch('allProducts', '/api/products');

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  return (
		<div>
      <p className='fs-3 my-3'>Edit products</p>
      <p>Here you can edit product properties</p>
      <hr/>
			{isLoading
			  ? <Loading />
			  : <EditDataTable
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
										<Image src={product.image} width={50} />
									</td>
									<td>{product.title}</td>
									<td>
										<EditDataIcon />
									</td>
									<td>
										<DeleteDataIcon />
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
