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

  const { code, socketId } = req.body;

  if (typeof code !== 'string' || typeof socketId !== 'string') {
    return res.status(500).send('Bad body');
  }

  await setCode(id, code);
  void notifyCodeChanged(id, code, socketId);

  res.status(200).end();
};

export default setCodeHandler;
