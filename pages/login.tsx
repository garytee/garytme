import Layout from '../src/components/Layouts/Layout';
import Head from 'next/head';
import { siteTitle } from '../src/components/Layouts/Layout';
import LoginForm from '../src/components/LoginForm';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{`Login | ${siteTitle}`}</title>
      </Head>
      <LoginForm />
    </Layout>
  );
}
