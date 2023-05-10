import log from 'loglevel';
import { validateReq, handleAPIError, handleResponse } from '@/util/api';
import axios from 'axios';

log.setLevel('error');

export default async function handler(req: any, res: any) {
  try {
    validateReq(req);
    const { Authorization, access_token } = req.headers;
    console.log('inside user api');

    const response = await axios({
      url: '/user',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        access_token
      }
    });

    if (response.data) {
      const user = await response.data;
      res.json(user);
    }
  } catch (e) {
    log.error(handleResponse(e));
    handleAPIError(res, 'BASIC PLAN PAYMENT INTENT FAILED');
  }
}
