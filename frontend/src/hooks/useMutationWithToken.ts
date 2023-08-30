import { useContext } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import { TokenContext } from '../context/TokenContext';

const useMutationWithToken = (
  routeURL: string,
  updateRequest: boolean,
  onMutate?: () => any
) => {
  const token = useContext(TokenContext);

  const sendRequest = async (data: any) => {
    const config = {
      headers: { Authorization: `Bearer ${token!.token}` }
    };
    let response: AxiosResponse<any, any>;
    if (!updateRequest) {
      response = await axios.post(routeURL, data, config);
    } else {
      response = await axios.put(routeURL, data, config);
    }
    return response.data;
  };

  return useMutation(sendRequest, { onMutate: onMutate && onMutate });
};

export default useMutationWithToken;
