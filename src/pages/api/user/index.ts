import log from 'loglevel';
import { validateReq, handleAPIError } from '@/util/api';
import axios from 'axios';

log.setLevel('error');

export default async function handler(req: any, res: any) {
  try {
    validateReq(req);
    const { Authorization, access_token } = req.headers;
    let user;

    const response = await axios({
      url: `${process.env.API_PATH}/user`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        access_token
      }
    });

    if (response.data) {
      user = response.data;
    }

    res.status(200).json(user);
  } catch (e) {
    handleAPIError(res, e, 'GET USER FAILED');
  }
}
