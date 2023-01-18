import { GetServerSideProps } from 'next';
import Layout from '../src/components/Layouts/Layout';
import { getPostsByPageNo } from '../lib/fetch';
import Head from 'next/head';
import { siteTitle } from '../src/components/Layouts/Layout';
import { AllPostsProps } from '../src/models/AllPostsProps';
import AllPostsTemplate from '../src/components/Templates/AllPostsTemplate';
import React from 'react';

export default function Posts({
  allPostsProps,
  nextPageNumber,
  prevPageNumber,
}: {
  allPostsProps: AllPostsProps[];
  nextPageNumber: number;
  prevPageNumber: number;
}) {
  return (
    <Layout>
      <Head>
        <title>{`Posts | ${siteTitle}`}</title>
      </Head>
      <AllPostsTemplate
        allPostsProps={allPostsProps}
        nextPageNumber={nextPageNumber}
        prevPageNumber={prevPageNumber}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // get the page number from the query string /posts?page=1
  const data = await getPostsByPageNo(query?.page as string);
  const totalPages = data.headers.get('X-WP-TotalPages') || '';
  const currentPage = parseInt(query?.page as string);
  const prevPageNumber = parseInt(query?.page as string) - 1;
  const nextPageNumber = parseInt(query?.page as string) + 1;

  // if there is no page number in the query string, then redirect to page 1
  if (!query.page) {
    return {
      props: {},
      redirect: {
        destination: '/posts?page=1',
      },
    };
  }

  // if currentPage is equal to totalPages, then there is no next page
  if (currentPage === parseInt(totalPages)) {
    return {
      props: {
        allPostsProps: data.data,
        nextPageNumber: null,
        prevPageNumber: prevPageNumber,
      },
    };
  }

  // if currentPage is equal to 1, then there is no prev page
  if (currentPage === 1) {
    return {
      props: {
        allPostsProps: data.data,
        nextPageNumber: nextPageNumber,
        prevPageNumber: null,
      },
    };
  }

  if (data.data.data && data.data.data.status === 400) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      allPostsProps: data.data,
      nextPageNumber: nextPageNumber,
      prevPageNumber: prevPageNumber,
    },
  };
};
