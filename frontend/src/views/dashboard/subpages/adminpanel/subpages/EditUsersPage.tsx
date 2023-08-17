/* eslint-disable multiline-ternary */
import React, { useContext } from 'react';

import EditDataTable from '../../../../../components/dashboard/EditDataTable';
import DeleteDataIcon from '../../../../../components/icons/dashboard/DeleteDataIcon';
import EditDataIcon from '../../../../../components/icons/dashboard/EditDataIcon';
import Loading from '../../../../../components/loading/Loading';
import { CurrentLanguageContext } from '../../../../../context/CurrentLanguageContext';
import { TokenContext } from '../../../../../context/TokenContext';
import {
  UserStructure,
  userStructure,
  passwordInputForUserStructure
} from '../../../../../data/inputStructure/userStructure';
import useFetch from '../../../../../hooks/useFetch';
import { getUserRoute, getUsersRoute } from '../../../../../services/apiRoutes';

const EditUsersPage = () => {
  const token = useContext(TokenContext);

  const { isLoading, data: users } = useFetch(
    'allUsers',
    getUsersRoute(),
    true,
    {
      headers: { authorization: 'Bearer ' + token!.token }
    }
  );
  const { lang } = useContext(CurrentLanguageContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <p className="fs-3 my-3">
        {lang.dashboard.tabs.adminPanel.editUsers.header.title}
      </p>
      <p>{lang.dashboard.tabs.adminPanel.editUsers.header.subtitle}</p>
      <hr />

      <EditDataTable
        createDataRoute={getUsersRoute()}
        inputStructure={[
          passwordInputForUserStructure[lang.current],
          ...userStructure.inputs[lang.current]
        ]}
        tableHeaderCells={
          <>
            <th>
              {lang.dashboard.tabs.adminPanel.editUsers.editUsersTable.emailCol}
            </th>
            <th>
              {lang.dashboard.tabs.adminPanel.editUsers.editUsersTable.nameCol}
            </th>
          </>
        }
        tableRowCells={
          <>
            {users.map((user: UserStructure, index: number) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>
                  <EditDataIcon
                    queryKey={`user-${user.id}`}
                    apiRoute={getUserRoute(user.id)}
                    inputStructure={userStructure.inputs[lang.current]}
                  />
                </td>
                <td>
                  <DeleteDataIcon
                    apiRoute={getUsersRoute(user.id)}
                    queryKey={'user-' + user.id}
                  />
                </td>
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};

export default EditUsersPage;
