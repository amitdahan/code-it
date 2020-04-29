import { useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

const pusher = new Pusher('804b22b07d6fb336eb9b', {
  cluster: 'eu',
});

type PusherEvent = 'change';

interface PusherEventMap {
  change: string;
}

const usePusher = <E extends PusherEvent>(
  channel: string,
  event: E,
  handler: (data: PusherEventMap[E]) => void
) => {
  const handlerRef = useRef<typeof handler>();

  handlerRef.current = handler;

  useEffect(() => {
    const sub = pusher.subscribe(channel);
    sub.bind(event, (data: PusherEventMap[E]) => handlerRef.current?.(data));

    return () => void sub.unbind(event);
  }, [channel, handler, event]);
};

export default usePusher;
