import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Layout from '../src/components/Layouts/Layout';
import { getAccount } from '../lib/fetch';
import React from 'react';
import { parseCookies } from 'nookies';
import { AccountProps } from '../src/models/AccountProps';
import { siteTitle } from '../src/components/Layouts/Layout';
import AccountTemplate from '../src/components/Templates/AccountTemplate';

export default function Account({
  accountProps,
}: {
  accountProps: AccountProps[];
}) {
  return (
    <Layout>
      <Head>
        <title>{`Account | ${siteTitle}`}</title>
      </Head>
      <AccountTemplate accountProps={accountProps} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies['token'];
  const getData = await getAccount(token);
  const accountProps = getData.data;

  if (!token || !accountProps || accountProps.success === false) {
    // redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      accountProps: [accountProps],
    },
  };
};
