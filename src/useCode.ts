import fetch from 'isomorphic-unfetch';
import useSWR, { mutate } from 'swr';
import usePusher from './usePusher';
import { useCallback, useMemo } from 'react';
import throttle from 'lodash/throttle';

const mutateCode = (id: string, code: string) =>
  mutate(`/api/get/${id}`, code, false);

const useCode = (id: string, initialData: string) => {
  const { data: code } = useSWR(`/api/get/${id}`, {
    initialData,
    fetcher: (url) => fetch(url).then((res) => res.text()),
  });

  const socketId = usePusher(`code-${id}`, 'change', (code: string) =>
    mutateCode(id, code)
  );

  const saveCode = useMemo(
    () =>
      throttle(
        (id: string, code: string) =>
          fetch(`/api/set/${id}`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, socketId }),
          }),
        500,
        { leading: false }
      ),
    [socketId]
  );

  const setCode = useCallback(
    (code: string) => Promise.all([mutateCode(id, code), saveCode(id, code)]),
    [saveCode, id]
  );

  return useMemo(() => ({ code, setCode }), [code, setCode]);
};

export default useCode;
