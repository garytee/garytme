import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import cx from 'classnames';
import DOMPurify from 'isomorphic-dompurify';
import Tooltip from '../Tooltip';
import { HomePageProps } from '../../models/HomePageProps';

const listvariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export default function HomePageTemplate({
  homePageProps,
}: {
  homePageProps: HomePageProps[];
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh]"
      variants={listvariants}
    >
      <section
        className={cx(
          'm-auto max-w-[400px] p-4 mx-4 border-[2px] border-black',
          'dark:border-white'
        )}
      >
        {homePageProps &&
          homePageProps.map(({ id, acf: { ...flexible_content } }) => (
            <div key={id}>
              {flexible_content &&
                flexible_content.flexible_content.map(
                  (
                    { name, location, title, description, links, image },
                    index
                  ) => (
                    <React.Fragment key={index}>
                      {name && (
                        <h1 className="m-auto text-center mb-2">{name}</h1>
                      )}
                      {location && (
                        <h2 className="m-auto text-center mb-2">{location}</h2>
                      )}
                      {title && (
                        <h3 className="m-auto text-center mb-2">{title}</h3>
                      )}
                      {description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                          }}
                        />
                      )}
                      {image && (
                        <Image
                          className="w-80 h-80 rounded-[50%] m-auto mb-2"
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '80px',
                          }}
                          src={image.url}
                          alt={image.alt}
                          width={80}
                          height={80}
                          priority
                        />
                      )}

                      {links && links.length > 0 && (
                        <div className="p-2 grid-flow-row gap-4 auto-rows-fr grid grid-cols-3 text-center m-auto text-2xl justify-items-center">
                          {links.map(({ icon, url, tooltip_text }, index) => (
                            <Tooltip text={tooltip_text} key={index}>
                              <Link
                                target={'_blank'}
                                href={url}
                                aria-label={tooltip_text}
                              >
                                <motion.div
                                  className="p-4 rounded-full border-[0px] light:border-black dark:border-white"
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
                                  {icon === 'FaEnvelope' && <FaEnvelope />}
                                  {icon === 'FaGithub' && <FaGithub />}
                                  {icon === 'FaLinkedin' && <FaLinkedin />}
                                </motion.div>
                              </Link>
                            </Tooltip>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  )
                )}
            </div>
          ))}
      </section>
    </motion.div>
  );
}
