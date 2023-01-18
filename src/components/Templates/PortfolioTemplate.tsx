import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import Modal from '../Modal';
import DOMPurify from 'isomorphic-dompurify';
import { PortfolioProps } from '../../models/PortfolioProps';

const listvariants = {
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  in: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.2,
      staggerDirection: 1,
    },
  },
  out: {
    opacity: 0,
    transition: {
      // fade out slowly
      duration: 0.5,
      // fade out all children at once
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemvariants = {
  initial: {
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
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};

export default function PortfolioTemplate({
  portfolioData,
}: {
  portfolioData: PortfolioProps[];
}) {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PortfolioProps>({
    id: 0,
    slug: '',
    title: {
      rendered: '',
    },
    acf: {
      flexible_content: [
        {
          image: {
            url: '',
            alt: '',
          },
          built_with: '',
          link_to_content: {
            url: '',
            title: '',
          },
          stack: [
            {
              stack_type: '',
              stack_items: [
                {
                  stack_item: '',
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const handleOpen = (post: PortfolioProps) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Portfolio</h1>
      <motion.ul
        className="p-8 grid-flow-row gap-4 auto-rows-fr grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 max-w-screen-desktop m-auto"
        initial="initial"
        animate="in"
        exit="out"
        variants={listvariants}
      >
        {portfolioData.map(
          ({
            id,
            slug,
            title: { rendered: title },
            acf: { ...flexible_content },
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
              onClick={() =>
                handleOpen({
                  id,
                  title: { rendered: title },
                  slug,
                  acf: {
                    flexible_content: [...flexible_content.flexible_content],
                  },
                })
              }
            >
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
              />
            </motion.li>
          )
        )}
      </motion.ul>
      <Modal
        setShowModal={setShowModal}
        selectedPost={selectedPost}
        showModal={showModal}
      />
    </>
  );
}
