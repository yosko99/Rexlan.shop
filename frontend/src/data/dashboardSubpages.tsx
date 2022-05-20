import React from 'react';

import { User } from '../types/userTypes';
import AdminPanelPage from '../views/dashboard/subpages/adminpanel';
import EditProductsPage from '../views/dashboard/subpages/adminpanel/subpages/EditProductsPage';
import MyDetailsPage from '../views/dashboard/subpages/MyDetailsPage';
import MyOrdersPage from '../views/dashboard/subpages/MyOrdersPage';
import PasswordChangePage from '../views/dashboard/subpages/PasswordChangePage';

export interface SubpageType {
  urlParam: string;
  page: React.ReactChild;
}

export const getSubpages = (user: User): SubpageType[] => {
  return [
    {
      urlParam: 'details',
      page: <MyDetailsPage user={user} />
    },
    {
      urlParam: 'password-change',
      page: <PasswordChangePage />
    },
    {
      urlParam: 'orders',
      page: <MyOrdersPage />
    },
    {
      urlParam: 'admin-panel',
      page: <AdminPanelPage />
    },
    {
      urlParam: 'products',
      page: <EditProductsPage />
    }
  ];
};
