import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../src/components/Layouts/Layout';
import { getPages, getPagePreview } from '../lib/fetch';
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
export const getStaticProps: GetStaticProps = async (context: any) => {
  if (context.preview && context.previewData) {
    const data = await getPagePreview(
      context.previewData.post_id,
      context.previewData.revision_id,
      context.previewData.token
    );
    return {
      props: {
        postProps: data.data,
        seoProps: {},
      },
    };
  }

  const data = await getPages();
  const pageProps = data.find((page: any) => page.slug == context.params?.slug);
  if (!pageProps || context.params?.slug == 'home') {
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
