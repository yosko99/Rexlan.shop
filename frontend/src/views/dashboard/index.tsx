import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import { TokenContext } from '../../context/TokenContext';
import { User } from '../../types/userTypes';
import RenderDashboard from './RenderDashboard';

const Dashboard = () => {
  const token = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>({
    createdAt: new Date(),
    email: '',
    name: '',
    phone: '',
    address: '',
    updatedAt: new Date(),
    zip: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token!.token === null) {
      navigate('/');
    } else {
      axios.get('/api/users/current', {
        headers: {
          authorization: 'Bearer ' + token!.token
        }
      }).then((response) => {
        const { email, name, phone, updatedAt, createdAt, address, zip } = response.data.user;
        setUserInfo({
          email, name, phone, updatedAt, createdAt, address, zip
        });
        setLoading(false);
      }).catch((_err) => {
        console.log(_err);
        // token!.setToken(null);
      });
    }
  }, []);

  return (
    <>
    {
      loading
        ? <Loading />
        : <RenderDashboard user={userInfo} />
    }
    </>
  );
};

export default Dashboard;
