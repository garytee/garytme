import Head from 'next/head';
import Layout, { siteTitle } from '../src/components/Layouts/Layout';
import { GetStaticProps } from 'next';
import { getPortfolio } from '../lib/fetch';
import React from 'react';
import { PortfolioProps } from '../src/models/PortfolioProps';
import PortfolioTemplate from '../src/components/Templates/PortfolioTemplate';

export default function Portfolio({
  portfolioWebsites,
  portfolioMobileApps,
  portfolioOpenSource,
}: {
  portfolioWebsites: PortfolioProps[];
  portfolioMobileApps: PortfolioProps[];
  portfolioOpenSource: PortfolioProps[];
}) {
  return (
    <Layout>
      <Head>
        <title>{`Portfolio | ${siteTitle}`}</title>
      </Head>
      <PortfolioTemplate
        portfolioWebsites={portfolioWebsites}
        portfolioMobileApps={portfolioMobileApps}
        portfolioOpenSource={portfolioOpenSource}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolioData = await getPortfolio();

  const portfolioWebsites = portfolioData.filter(
    (post: any) => post.acf.type === 'Website'
  );

  const portfolioMobileApps = portfolioData.filter(
    (post: any) => post.acf.type === 'Mobile App'
  );

  const portfolioOpenSource = portfolioData.filter(
    (post: any) => post.acf.type === 'Open Source'
  );

  return {
    props: {
      portfolioWebsites: portfolioWebsites,
      portfolioMobileApps: portfolioMobileApps,
      portfolioOpenSource: portfolioOpenSource,
    },
    revalidate: 1,
  };
};
