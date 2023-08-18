import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import { TokenContext } from '../../context/TokenContext';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { getCurrentUserRoute } from '../../services/apiRoutes';
import RenderDashboard from './RenderDashboard';

const Dashboard = () => {
  // Redirect if no token is set
  useAuth(false);

  const token = useContext(TokenContext);

  const {
    data: user,
    isLoading,
    error
  } = useFetch(
    ['profile', token!.token as string],
    getCurrentUserRoute(),
    true
  );

  if (isLoading) {
    return <Loading height="90vh" />;
  }
  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  return <RenderDashboard user={user} />;
};

export default Dashboard;
