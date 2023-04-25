import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type Options = {
  path: string;
  method: string;
  data?: any;
};

const init: Options = { path: 'user', method: 'get' };

const getData = (options = init, signal = null) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const controller = signal || new AbortController();
    const signalToUse = controller.signal;
    const { path, method, data } = options;

    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url: `/api/${path}`,
          data,
          cancelToken: source.token,
          signal: signalToUse
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
      controller.abort();
    };
  }, [options, signal]);

  return { data, isLoading, error };
};

const useData = (options = init, signal = null) => {
  const data = getData(options, signal);

  return useMemo(() => data, [data]);
};

export default useData;
