import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../src/components/Layouts/Layout';
import { getPages } from '../lib/fetch';
import React from 'react';
import { PageProps } from '../src/models/PageProps';
import { SeoProps } from '../src/models/SeoProps';
import ResumeTemplate from '../src/components/Templates/ResumeTemplate';
import SeoTemplate from '../src/components/Templates/SeoTemplate';
import PageTemplate from '../src/components/Templates/PageTemplate';

export default function Page({
  pageProps,
  seoProps,
}: {
  pageProps: PageProps;
  seoProps: SeoProps;
}) {
  return (
    <Layout>
      <SeoTemplate seoProps={seoProps} />
      {pageProps.template === 'template-resume.php' ? (
        <ResumeTemplate pageProps={pageProps} />
      ) : (
        <PageTemplate pageProps={pageProps} />
      )}
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPages();
  const paths = data.map(({ slug }: any) => ({
    params: {
      slug: `${slug}`,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPages();
  const pageProps = data.find((page: any) => page.slug == params?.slug);
  if (!pageProps || params?.slug == 'home') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pageProps: pageProps,
      seoProps: pageProps.yoast_head_json,
    },
    revalidate: 1,
  };
};
