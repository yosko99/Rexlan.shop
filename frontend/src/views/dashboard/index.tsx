import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { TokenContext } from '../../context/TokenContext';
import RenderDashboard from './RenderDashboard';

const Dashboard = () => {
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token!.token === null) {
      navigate('/');
    }
  });

	

  return (
		<RenderDashboard />
  );
};

export default Dashboard;
