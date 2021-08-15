import Head from 'next/head';

import Header from '../components/Header';
import '../styles/globals.scss';

function GroceryListApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Grocery List</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default GroceryListApp;
