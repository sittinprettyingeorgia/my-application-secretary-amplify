/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getData, getError } from './PureFunctions';
import { ApiError, Method } from './types';

/**
 * useData should cache/memoize data.
 * useData should handle retries.
 * useData should handle loading indicator.
 * useData should handle error indicator.
 * @returns any data
 */

const useData = (
  url: string,
  retries = 0,
  method = Method.GET, //default is GET
  body?: any // number of retries before failure
): {
  //returns
  apiData: any; // the result of query on url
  loading: boolean; // loading indicator
  error?: ApiError; //error indicator
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>();
  const [error, setError] = useState<ApiError>();
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const getMemoData = () =>
    useMemo(
      async () => getData(method, url, abortControllerRef, retries, body),
      [method, url, body, retries]
    );

  const handleData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMemoData();

      if (response.data) {
        setApiData(response.data);
      }
    } catch (e: any) {
      setError(getError(e));
    } finally {
      setLoading(false);
    }
  }, [method, url, body, setError, setLoading, getMemoData]);

  useEffect(() => {
    const controller = abortControllerRef.current;
    handleData();

    return () => {
      controller.abort();
    };
  }, [handleData, method, url, body]);

  return { apiData, loading, error };
};

export default useData;
