import React from 'react';

import { User } from '../types/userTypes';
import AdminPanelPage from '../views/dashboard/subpages/adminpanel';
import EditCategoriesPage from '../views/dashboard/subpages/adminpanel/subpages/EditCategoriesPage';
import EditDeliveriesPage from '../views/dashboard/subpages/adminpanel/subpages/EditDeliveriesPage';
import EditProductsPage from '../views/dashboard/subpages/adminpanel/subpages/EditProductsPage';
import EditUsersPage from '../views/dashboard/subpages/adminpanel/subpages/EditUsersPage';
import MyDetailsPage from '../views/dashboard/subpages/MyDetailsPage';
import MyOrdersPage from '../views/dashboard/subpages/MyOrdersPage';
import PasswordChangePage from '../views/dashboard/subpages/PasswordChangePage';

export interface SubpageType {
  urlParam: string;
  page: React.ReactNode;
}

export const dashboardSubpages = (user: User): SubpageType[] => {
  return [
    {
      urlParam: 'details',
      page: <MyDetailsPage user={user}/>
    },
    {
      urlParam: 'password-change',
      page: <PasswordChangePage/>
    },
    {
      urlParam: 'orders',
      page: <MyOrdersPage/>
    },
    {
      urlParam: 'admin-panel',
      page: <AdminPanelPage/>
    },
    {
      urlParam: 'products',
      page: <EditProductsPage/>
    },
    {
      urlParam: 'categories',
      page: <EditCategoriesPage/>
    },
    {
      urlParam: 'users',
      page: <EditUsersPage/>
    },
    {
      urlParam: 'deliveries',
      page: <EditDeliveriesPage/>
    }
  ];
};
