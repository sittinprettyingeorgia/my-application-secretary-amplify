import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 200;
  let result;

  try {
    const response = await axios(`${process.env.REST_API}/jobLink`);
    result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
    console.log('Failed to retrieve user job link');
  }

  res.status(statusCode).json(result);
};

export default handler;
