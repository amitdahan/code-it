import { useEffect, useMemo, useRef, useState } from 'react';
import Pusher from 'pusher-js';

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

  const pusher = useMemo(
    () =>
      new Pusher('804b22b07d6fb336eb9b', {
        cluster: 'eu',
      }),
    []
  );

  const [socketId, setSocketId] = useState<string>();

  useEffect(() => {
    pusher.connection.bind('connected', () =>
      setSocketId(pusher.connection.socket_id)
    );
  }, [setSocketId]);

  useEffect(() => {
    const sub = pusher.subscribe(channel);
    sub.bind(event, (data: PusherEventMap[E]) => handlerRef.current?.(data));

    return () => void sub.unbind(event);
  }, [pusher, channel, handler, event]);

  return socketId;
};

export default usePusher;
