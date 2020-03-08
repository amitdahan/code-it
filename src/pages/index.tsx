import { FC } from 'react';
import Head from 'next/head';
import Editor from '../editor';

const sampleCode = `function foo(): 'bar' | 'baz' {
  return Math.random() > 0.5 ? 'bar' : 'baz';
}
`;

const Home: FC = () => (
  <div className="root">
    <Head>
      <title>Code It!</title>
    </Head>
    <Editor value={sampleCode} language="typescript" theme="vs-dark" />

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
