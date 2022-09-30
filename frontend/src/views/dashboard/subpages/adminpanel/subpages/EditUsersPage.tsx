import React, { useContext } from 'react';

import { useQueryClient } from 'react-query';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { TokenContext } from '../../../../../context/TokenContext';
import { UserStructure, userStructure, passwordInputForUserStructure } from '../../../../../data/inputStructure/userStructure';
import { getUserRoute, getUsersRoute } from '../../../../../services/apiRoutes';
import useFetch from '../../../../../hooks/useFetch';

const EditUsersPage = () => {
  const queryClient = useQueryClient();
  const token = useContext(TokenContext);

  const { user } = queryClient.getQueryData(['profile', token!.token as string]) as any;
  const currentUser = user as UserStructure;

  const {
    isLoading,
    data: users
  } = useFetch('allUsers', getUsersRoute(), true);

  return (
        <div>
            <p className='fs-3 my-3'>Edit users</p>
            <p>Here you can edit user data</p>
            <hr />
            {isLoading
              ? <Loading />
              : <EditDataTable
                    createDataRoute={getUsersRoute()}
                    inputStructure={[passwordInputForUserStructure, ...userStructure.inputs]}
                    tableHeaderCells={
                        <>
                            <th>Email</th>
                            <th>Name</th>
                        </>}
                    tableRowCells={
                        <>
                            {users.map((user: UserStructure, index: number) => (
                              currentUser.email !== user.email && // Skip current user
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <EditDataIcon
                                            queryKey={`user-${user._id}`}
                                            apiRoute={getUserRoute(user._id)}
                                            inputStructure={userStructure.inputs}
                                        />
                                    </td>
                                    <td>
                                        <DeleteDataIcon
                                            apiRoute={getUserRoute(user._id)}
                                            queryKey={'user-' + user._id}
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

export default EditUsersPage;
