import Head from 'next/head';
import Header from './header';

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>{children}</main>
  </>
);

export default Layout;
