import { FC } from 'react';
import Head from 'next/head';
import Editor from '../editor';
// import Pusher from 'pusher-js';

const sampleCode = `function foo(): 'bar' | 'baz' {
  return Math.random() > 0.501 ? 'bar' : 'baz';
}
`;

const pushToPusher = async () => {
  await fetch('/api/set', { method: 'POST' });
};

const Home: FC = () => (
  <div className="root">
    <Head>
      <title>Code It!</title>
    </Head>
    <Editor
      value={sampleCode}
      language="typescript"
      theme="vs-dark"
      onChange={pushToPusher}
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
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
