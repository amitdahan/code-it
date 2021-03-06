import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '959391',
  key: '804b22b07d6fb336eb9b',
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

export const trigger = pusher.trigger;
