import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '959391',
  key: '804b22b07d6fb336eb9b',
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true
});

const trigger = (channel: string, event: string, data: unknown) =>
  new Promise((resolve, reject) =>
    pusher.trigger(channel, event, data, (err, req, res) =>
      err ? reject(err) : resolve(res)
    )
  );

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await trigger('my-channel', 'my-event', {
      message: 'hello world'
    });
    res.send('OK');
  } else {
    res.status(500).send('Bad method');
  }
};
