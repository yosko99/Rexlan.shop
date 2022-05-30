import React, { FC } from 'react';

import { Table } from 'react-bootstrap';
import { useQueryClient } from 'react-query';

import CustomInput from '../inputs/CustomInput';
import CustomModal from '../modal/CustomModal';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	tableHeaderCells: React.ReactChild;
	tableRowCells: React.ReactChild;
	dataStructure: any;
	createDataRoute: string;
}

const EditDataTable: FC<Props> = ({ tableHeaderCells, tableRowCells, dataStructure, createDataRoute }) => {
  const queryClient = useQueryClient();

  return (
		<>
			{/* Add data */}
			<CustomModal
				activateButtonText='Add data'
				modalHeader={'Add data'}
				modalBody={
					<FormTemplate
						inputs={
							<>
								{
									Object.keys(dataStructure).map((property: any, index: number) => (
										<CustomInput
											key={index}
											defaultValue={dataStructure[property]}
											inputLabel={property}
											inputName={property}
											isNumber={typeof dataStructure[property] === 'number'}
										/>
									))
								}
							</>}
						mutateURL={createDataRoute}
						redirectOnSuccess={false}
						onSuccessFn={() => queryClient.refetchQueries()}
					/>}
				activateButtonClassName="w-100 mb-3 btn-info"
			/>
			{/* Add data */}
			<Table striped bordered hover>
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
		</>
  );
};

export default EditDataTable;
