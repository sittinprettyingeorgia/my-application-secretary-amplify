import { useEffect, useMemo, useState } from 'react';
import axios, { Method } from 'axios';

type Options = {
  path: string;
  method: Method;
  data?: any;
};

const init: Options = { path: 'user', method: 'get' };

const useData1 = (options = init, signal = null) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { path, method, data } = options;

    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url: `/api/${path}`,
          data,
          cancelToken: source.token
        });
        setData(response.data);
      } catch (e: any) {
        if (!axios.isCancel(e)) {
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      source.cancel('Request canceled.');
    };
  }, [options, signal]);

  return { data, isLoading, error };
};

const useData = (options = init, signal = null) => {
  const data = useData1(options, signal);

  return useMemo(() => data, [data]);
};

export default useData;
