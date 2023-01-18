import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Raleway } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import cx from 'classnames';

const railwayFont = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class">
      <main
        className={cx(railwayFont.className, 'bg-gray-100', 'dark:bg-gray-900')}
      >
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}
