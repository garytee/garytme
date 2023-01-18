import Head from 'next/head';
import Layout, { siteTitle } from '../src/components/Layouts/Layout';
import { GetStaticProps } from 'next';
import { getPortfolio } from '../lib/fetch';
import React from 'react';
import { PortfolioProps } from '../src/models/PortfolioProps';
import PortfolioTemplate from '../src/components/Templates/PortfolioTemplate';

export default function Portfolio({
  portfolioData,
}: {
  portfolioData: PortfolioProps[];
}) {
  return (
    <Layout>
      <Head>
        <title>{`Portfolio | ${siteTitle}`}</title>
      </Head>
      <PortfolioTemplate portfolioData={portfolioData} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolioData = await getPortfolio();
  return {
    props: {
      portfolioData,
    },
    revalidate: 1,
  };
};
