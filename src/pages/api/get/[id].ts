import { NextApiHandler } from 'next';
import { getCode } from '../../../db/code';

const getCodeHandler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(500).send('Bad method');
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(500).send('Bad param');
  }

  return res.send(await getCode(id));
};

export default getCodeHandler;
