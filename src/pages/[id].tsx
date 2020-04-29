import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { apiUrl } from '../utils';
import Head from 'next/head';
import Editor from '../editor';
import useCode from '../useCode';

interface ServerSideProps {
  initialCode: string;
}

const useCurrentId = () => {
  const router = useRouter();
  const { id } = router.query;
  return id as string;
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
        language="typescript"
        theme="vs-dark"
        value={code}
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
