import { useEffect, useState } from 'react';
import axios, { Method } from 'axios';
import { Cache } from 'aws-amplify';

type Options = {
  path: string;
  method: Method;
  data?: any;
};

const init: Options = { path: 'user', method: 'get' };

const getData = async (options = init) => {
  const { path, method, data: postData } = options;

  const fetchData = async () => {
    try {
      const response = await axios({
        method,
        url: `/api/${path}`,
        data: postData
      });
      return response.data;
    } catch (e: any) {
      return e;
    }
  };

  return fetchData();
};

export default getData;
