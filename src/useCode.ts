import fetch from 'isomorphic-unfetch';
import useSWR, { mutate } from 'swr';
import usePusher from './usePusher';
import { useCallback, useMemo } from 'react';

const saveCode = (id: string, code: string) =>
  Promise.all([
    fetch(`/api/set/${id}`, {
      method: 'post',
      body: code,
    }),
    mutate(`/api/get/${id}`, code, false),
  ]);

const useCode = (id: string, initialData: string) => {
  const { data: code } = useSWR(`/api/get/${id}`, {
    initialData,
    fetcher: (url) => fetch(url).then((res) => res.text()),
  });

  usePusher(`code-${id}`, 'change', (code: string) =>
    mutate(`/api/get/${id}`, code, false)
  );

  const setCode = useCallback((code: string) => saveCode(id, code), [id]);

  return useMemo(() => ({ code, setCode }), [code, setCode]);
};

export default useCode;
