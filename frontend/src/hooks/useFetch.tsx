import React from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';

interface ReturnTypes {
	error: Error | undefined;
	isLoading: boolean;
	data: any;
}

const useFetch = (queryKey: string | string[], url: string): ReturnTypes => {
  const getData = async () => {
    return await axios.get(url)
      .then((response) => response.data);
  };

  const {
    isLoading,
    error,
    isError,
    data
  } = useQuery(queryKey, () => getData());

  return {
    isLoading,
    error: isError ? error as Error : undefined,
    data
  };
};

export default useFetch;
