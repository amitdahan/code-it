import { FC } from 'react';
import Head from 'next/head';
import css from './index.module.css';

const Home: FC = () => (
  <div className={css.root}>
    <Head>
      <title>Code It!</title>
    </Head>
  </div>
);

export default Home;
