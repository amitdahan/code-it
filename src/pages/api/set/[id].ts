import { NextApiHandler } from 'next';
import { notifyCodeChanged } from '../../../realtime/code';
import { setCode } from '../../../db/code';

const setCodeHandler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(500).send('Bad method');
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(500).send('Bad param');
  }

  const code = req.body;

  if (typeof code !== 'string') {
    return res.status(500).send('Bad body');
  }

  await setCode(id, code);
  notifyCodeChanged(id, code);

  res.status(200).end();
};

export default setCodeHandler;
