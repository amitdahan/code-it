import { FC } from 'react';
import Head from 'next/head';
import css from './index.module.css';

const Home: FC = () => (
  <div className={css.root}>
    <Head>
      <title>Code It!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className={css.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={css.description}>
        Get started by editing <code>pages/index.js</code>
      </p>

      <div className={css.grid}>
        <a href="https://nextjs.org/docs" className={css.card}>
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className={css.card}>
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/zeit/next.js/tree/master/examples"
          className={css.card}
        >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://zeit.co/new?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={css.card}
        >
          <h3>Deploy &rarr;</h3>
          <p>
            Instantly deploy your Next.js site to a public URL with ZEIT Now.
          </p>
        </a>
      </div>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>

    <style jsx>{``}</style>
  </div>
);

export default Home;
