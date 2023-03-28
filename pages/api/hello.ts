import axios from 'axios';
import nextConnect from 'next-connect';
import cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  error?: string;
};

const handler = nextConnect<NextApiRequest, NextApiResponse<Data>>();

// Middleware for setting up CORS
handler.use(cors({ origin: process.env.NEXT_PUBLIC_APP_ORIGIN }));

handler.get(async (req, res) => {
  try {
    const response = await axios.get(process.env.PYTHON_APP_ORIGIN + '/api/data');
    res.status(200).json({ message: response.data.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to load data' });
  }
});

export default handler;
