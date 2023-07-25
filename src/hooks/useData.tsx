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
  try {
    const { path, method, data: postData } = options;
    const response = await axios({
      method,
      url: `/api/${path}`,
      data: postData
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getData;
