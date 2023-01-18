import { SeoProps } from '../../models/SeoProps';
import Head from 'next/head';

export default function SeoTemplate({ seoProps }: { seoProps: SeoProps }) {
  return (
    <Head>
      {seoProps && (
        <>
          <title>{seoProps.title}</title>
          <meta name="description" content={seoProps.og_description} />
          <meta property="og:title" content={seoProps.og_title} />
          <meta property="og:description" content={seoProps.og_description} />
          <meta property="og:type" content={seoProps.og_type} />
          {seoProps.og_image && (
            <meta property="og:image" content={seoProps.og_image[0].url} />
          )}
        </>
      )}
    </Head>
  );
}
