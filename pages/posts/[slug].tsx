import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../src/components/Layouts/Layout';
import { getPosts, getPostPreview } from '../../lib/fetch';
import { PostProps } from '../../src/models/PostProps';
import { SeoProps } from '../../src/models/SeoProps';
import SeoTemplate from '../../src/components/Templates/SeoTemplate';
import PostTemplate from '../../src/components/Templates/PostTemplate';
import { usePreviewModeExit } from '../../src/utils/auth-functions';
export default function Post({
  postProps,
  seoProps,
}: {
  postProps: PostProps;
  seoProps: SeoProps;
}) {
  usePreviewModeExit();
  return (
    <Layout>
      <SeoTemplate seoProps={seoProps} />
      <PostTemplate postProps={postProps} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPosts();
  const paths = data.map(({ slug }: { slug: string }) => ({
    params: {
      slug: `${slug}`,
    },
  }));
  console.log('paths', paths);
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async (ctx: any) => {
  console.log('ctx', ctx);
  if (ctx.preview && ctx.previewData) {
    const data = await getPostPreview(
      ctx.previewData.post_id,
      ctx.previewData.revision_id,
      ctx.previewData.token
    );
    return {
      props: {
        postProps: data.data,
        seoProps: {},
      },
    };
  }
  if (!ctx.params || !ctx.params.slug) {
    return { notFound: true };
  }
  const data = await getPosts();
  const getDataFromSlug = data.find(
    (post: any) => post.slug == ctx.params?.slug
  );
  if (!getDataFromSlug) {
    return { notFound: true };
  }
  return {
    props: {
      postProps: getDataFromSlug,
      seoProps: getDataFromSlug?.yoast_head_json || {},
    },
    revalidate: 1,
  };
};
