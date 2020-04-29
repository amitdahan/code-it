import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { apiUrl } from '../utils';
import Head from 'next/head';
import Editor from '../editor';
import useSWR, { mutate, trigger } from 'swr';
import { useCallback, useEffect, useMemo } from 'react';
import Pusher from 'pusher-js';

interface ServerSideProps {
  initialCode: string;
}

const useCurrentId = () => {
  const router = useRouter();
  const { id } = router.query;
  return id as string;
};

const usePusher = (
  channel: string,
  event: string,
  handler: (data: any) => void
) => {
  const pusher = useMemo(
    () =>
      new Pusher('804b22b07d6fb336eb9b', {
        cluster: 'eu',
      }),
    []
  );

  useEffect(() => {
    const sub = pusher.subscribe(channel);
    sub.bind(event, handler);

    return () => {
      sub.unbind(event);
    };
  }, [pusher, channel, handler, event]);
};

const useCode = (id: string, initialData: string) => {
  const { data: code } = useSWR(`/api/get/${id}`, {
    initialData,
    fetcher: (url) => fetch(url).then((res) => res.text()),
  });

  const pusherHandler = useCallback(
    (code: string) => mutate(`/api/get/${id}`, code),
    [id]
  );

  usePusher(`code-${id}`, 'change', pusherHandler);

  const setCode = useCallback(
    async (code: string) => {
      await fetch(`/api/set/${id}`, {
        method: 'post',
        body: code,
      });
      trigger(`/api/get/${id}`);
    },
    [id]
  );

  return useMemo(() => ({ code, setCode }), [code, setCode]);
};

const InfoPage: NextPage<ServerSideProps> = ({ initialCode }) => {
  const id = useCurrentId();
  const { code, setCode } = useCode(id, initialCode);

  return (
    <div className="root">
      <Head>
        <title>Code It!</title>
      </Head>
      <Editor
        value={code}
        language="typescript"
        theme="vs-dark"
        onChange={setCode}
      />

      <style jsx>{`
        .root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: stretch;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(apiUrl(ctx.req, `/api/get/${ctx.params?.id}`));

  return {
    props: {
      initialCode: await res.text(),
    },
  };
};

export default InfoPage;
