import Layout from '../src/components/Layouts/Layout';
import { GetStaticProps } from 'next';
import { getHome } from '../lib/fetch';
import React from 'react';
import { HomePageProps } from '../src/models/HomePageProps';
import { SeoProps } from '../src/models/SeoProps';
import SeoTemplate from '../src/components/Templates/SeoTemplate';
import HomePageTemplate from '../src/components/Templates/HomePageTemplate';

export default function Home({
  homePageProps,
  seoProps,
}: {
  homePageProps: HomePageProps[];
  seoProps: SeoProps;
}) {
  return (
    <Layout>
      <SeoTemplate seoProps={seoProps} />
      <HomePageTemplate homePageProps={homePageProps} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const homePageProps = await getHome();
  const seoProps = homePageProps[0].yoast_head_json;
  return {
    props: {
      homePageProps,
      seoProps: seoProps,
    },
    revalidate: 1,
  };
};
