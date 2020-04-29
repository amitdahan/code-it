import fetch from 'isomorphic-unfetch';
import useSWR, { mutate } from 'swr';
import usePusher from './usePusher';
import { useCallback, useMemo } from 'react';
import throttle from 'lodash/throttle';

const mutateCode = (id: string, code: string) =>
  mutate(`/api/get/${id}`, code, false);

const saveCode = throttle(
  (id: string, code: string) =>
    fetch(`/api/set/${id}`, {
      method: 'post',
      body: code,
    }),
  1000,
  { leading: false }
);

const useCode = (id: string, initialData: string) => {
  const { data: code } = useSWR(`/api/get/${id}`, {
    initialData,
    fetcher: (url) => fetch(url).then((res) => res.text()),
  });

  usePusher(`code-${id}`, 'change', (code: string) => mutateCode(id, code));

  const setCode = useCallback(
    (code: string) => Promise.all([mutateCode(id, code), saveCode(id, code)]),
    [id]
  );

  return useMemo(() => ({ code, setCode }), [code, setCode]);
};

export default useCode;
