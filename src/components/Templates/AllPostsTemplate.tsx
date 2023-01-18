import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import DOMPurify from 'isomorphic-dompurify';
import { AllPostsProps } from '../../../src/models/AllPostsProps';

const listvariants = {
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  in: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      staggerDirection: 1,
    },
  },
  out: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemvariants: any = {
  initial: {
    pointerEvents: 'none',
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
  in: {
    y: 0,
    pointerEvents: 'all',
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
  out: {
    pointerEvents: 'none',
    y: 0,
    x: '-100%',
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};

export default function AllPostsTemplate({
  allPostsProps,
  nextPageNumber,
  prevPageNumber,
}: {
  allPostsProps: AllPostsProps[];
  nextPageNumber: number;
  prevPageNumber: number;
}) {
  const { theme } = useTheme();
  return (
    <>
      <motion.ul
        className="p-8 grid-flow-row gap-4 auto-rows-fr grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 max-w-screen-desktop m-auto"
        initial="initial"
        animate="in"
        exit="out"
        variants={listvariants}
      >
        {allPostsProps.map(
          ({
            id,
            slug,
            title: { rendered: title },
            acf: { featured_image },
          }) => (
            <motion.li
              variants={itemvariants}
              className="p-4 border-[1px] light:border-black dark:border-white"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
                cursor: 'pointer',
                boxShadow:
                  theme === 'dark'
                    ? '0px 0px 10px rgba(255,255,255,0.4)'
                    : '0px 0px 10px rgba(0,0,0,0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              key={id}
            >
              <Link className="flex flex-col h-[100%]" href={`/posts/${slug}`}>
                {featured_image && (
                  <Image
                    src={featured_image.url}
                    alt={featured_image.alt}
                    style={{ width: '100%', height: 'auto', maxWidth: '96px' }}
                    width={96}
                    height={96}
                    key={id}
                  />
                )}
                <h3
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(title),
                  }}
                />
              </Link>
            </motion.li>
          )
        )}
      </motion.ul>
      <div
        className={cx(
          'p-8 grid-flow-row gap-4 auto-rows-fr grid',
          {
            'grid-cols-1': !prevPageNumber || !nextPageNumber,
          },
          {
            'grid-cols-2': prevPageNumber && nextPageNumber,
          }
        )}
      >
        {prevPageNumber && (
          <Link href={`/posts?page=${prevPageNumber}`}>Prev</Link>
        )}
        {nextPageNumber && (
          <div className="text-right">
            <Link href={`/posts?page=${nextPageNumber}`}>Next</Link>
          </div>
        )}
      </div>
    </>
  );
}
