import { FC } from 'react';
import Head from 'next/head';
import css from './index.module.css';
import Editor from '../editor';

const sampleCode = `function foo(): 'bar' | 'baz' {
  return Math.random() > 0.5 ? 'bar' : 'baz';
}
`;

const Home: FC = () => (
  <div className={css.root}>
    <Head>
      <title>Code It!</title>
    </Head>
    <Editor value={sampleCode} height={400} width={600} language="typescript" />
  </div>
);

export default Home;
