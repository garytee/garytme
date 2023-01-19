import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../src/components/Layouts/Layout';
import { getPosts, getPostById } from '../../lib/fetch';
import { PostProps } from '../../src/models/PostProps';
import { SeoProps } from '../../src/models/SeoProps';
import SeoTemplate from '../../src/components/Templates/SeoTemplate';
import PostTemplate from '../../src/components/Templates/PostTemplate';

export default function Post({
  postProps,
  seoProps,
}: {
  postProps: PostProps;
  seoProps: SeoProps;
}) {
  return (
    <Layout>
      <SeoTemplate seoProps={seoProps} />
      <PostTemplate postProps={postProps} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPosts();
  const paths = data.map(({ slug }: any) => ({
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
// export const getStaticProps: GetStaticProps = async ({ params }) => {

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.preview && ctx.previewData) {
    const { id, headers }: any = ctx.previewData;

    const {
      data: { post: post },
    } = await getPostById(id, { headers });

    // return { props: post };
    return {
      props: {
        postProps: post,
        // seoProps: getDataFromSlug.yoast_head_json,
      },
      revalidate: 1,
    };
  }

  if (!ctx.params || !ctx.params.slug) {
    return { notFound: true };
  }

  // const {
  //   data: { post: props },
  // } = await getPostBySlug(ctx.params.slug);

  //   return { props };
  // };

  const data = await getPosts();
  const getDataFromSlug = data.find(
    (post: any) => post.slug == ctx.params?.slug
  );
  return {
    props: {
      postProps: getDataFromSlug,
      seoProps: getDataFromSlug.yoast_head_json,
    },
    revalidate: 1,
  };
};
