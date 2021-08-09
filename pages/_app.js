import Head from 'next/head';
import Link from 'next/link';

import '../styles/globals.scss';

function GroceryListApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Grocery List App</title>
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default GroceryListApp;
