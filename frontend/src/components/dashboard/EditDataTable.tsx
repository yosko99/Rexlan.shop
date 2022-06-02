import React, { FC } from 'react';

import { Table } from 'react-bootstrap';

import TableAddDataButton from './TableAddDataButton';

interface Props {
	tableHeaderCells: React.ReactChild;
	tableRowCells: React.ReactChild;
	dataStructure: any;
	createDataRoute: string;
}

const EditDataTable: FC<Props> = ({ tableHeaderCells, tableRowCells, dataStructure, createDataRoute }) => {
  return (
		<>
			{/* Add data */}
			<TableAddDataButton
				dataStructure={dataStructure}
				createDataRoute={createDataRoute}
			/>
			{/* Add data */}

			{/* Table wtih data */}
			<Table striped bordered hover className='text-center'>
				<thead>
					<tr className='text-center'>
						{tableHeaderCells}
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{tableRowCells}
				</tbody>
			</Table>
			{/* Table wtih data */}
		</>
  );
};

export default EditDataTable;
