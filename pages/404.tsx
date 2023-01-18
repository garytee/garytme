import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../src/components/Layouts/Layout';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import cx from 'classnames';

export default function PageNotFound() {
  return (
    <Layout>
      <Head>
        <title>{`Page Not Found | ${siteTitle}`}</title>
      </Head>
      <section className="flex flex-col items-center justify-center min-h-[80vh]">
        <div
          className={cx(
            'max-w-[400px] p-4 mx-4 border-[2px] border-black text-center',
            'dark:border-white'
          )}
        >
          <h1 className=" text-2xl ">Page Not Found</h1>
        </div>
        <div className="max-w-[400px] p-4 mx-4 text-center">
          <Link href="/">
            Go Home
            <FaArrowAltCircleRight className="inline-block ml-2" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
