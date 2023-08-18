import { useContext } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';

import { TokenContext } from '../context/TokenContext';

interface ReturnTypes {
  error: Error | undefined;
  isLoading: boolean;
  data: any;
  refetch: () => void;
}

const useFetch = (
  queryKey: string | string[],
  url: string,
  fetchOnLoad: boolean
): ReturnTypes => {
  const token = useContext(TokenContext);

  const getData = async () => {
    return await axios
      .get(url, {
        headers: { authorization: 'Bearer ' + token!.token }
      })
      .then((response) => response.data);
  };

  const { isLoading, error, isError, data, refetch } = useQuery(
    queryKey,
    () => getData(),
    {
      enabled: fetchOnLoad
    }
  );

  return {
    isLoading,
    error: isError ? (error as Error) : undefined,
    data,
    refetch
  };
};

export default useFetch;
