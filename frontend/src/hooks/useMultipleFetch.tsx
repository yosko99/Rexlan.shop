import React from 'react';

import axios from 'axios';
import { useQueries } from 'react-query';

interface ReturnTypes {
	error: Error | undefined;
	isLoading: boolean;
	data: any;
}

interface QueryAttributes {
		queryKey: string;
		link: string;
}

interface ResponseType {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  data: any;
}

const getData = async (url: string) => {
  return await axios.get(url)
    .then((response) => response.data);
};

const useMultipleFetch = (queries: QueryAttributes[]): ReturnTypes => {
  const useQueriesData = queries.map((query) => {
    return {
      queryKey: query.queryKey,
      queryFn: () => getData(query.link)
    };
  });

  const response: ResponseType[] = useQueries(useQueriesData);

  const isLoading = response.some((results) => results.isLoading);
  const isError = response.some((results) => results.isError);
  const data = response.map((results) => results.data);
  const error = response.some((results) => results.error) as unknown;

  const err: Error | undefined = isError ? error as Error : undefined;

  return {
    isLoading,
    error: err,
    data
  };
};

export default useMultipleFetch;
