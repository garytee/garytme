import { useEffect, useRef, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useMediaQuery } from '../../utils/commmon-functions';
import ActiveLink from '../../utils/ActiveLink';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { isUserValidated, logoutUser } from '../../utils/auth-functions';
import isEmpty from '../../validator/isEmpty';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), {
  ssr: false,
});

const Path = (props: any) => {
  const { theme } = useTheme();
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={theme && theme === 'dark' ? '#FFFFFF' : 'hsl(0, 0%, 18%)'}
      strokeLinecap="round"
      {...props}
    />
  );
};

const MenuToggle = ({ toggle }: any) => (
  <button className="fixed top-[24px] z-10 right-8" onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: {
            d: 'M 3 16.5 L 17 2.5',
            stroke: '#FFFFFF',
          },
        }}
        transition={{ duration: 0.35 }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: {
            d: 'M 3 2.5 L 17 16.346',
            stroke: '#FFFFFF',
          },
        }}
        transition={{ duration: 0.35 }}
      />
    </svg>
  </button>
);
const sidebar = {
  open: (height = 1000) => ({
    boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
    height: '100%',
    right: 0,
    x: '0%',
    width: '250px',
    transition: {
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    x: '0%',
    width: '0px',
    right: 0,
    height: '100%',
    transition: {
      delay: 0.1,
    },
  },
};
const listvariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const itemvariants: any = {
  open: {
    y: 0,
    pointerEvents: 'all',
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    pointerEvents: 'none',
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const navLinks = [
  {
    name: 'Resume',
    path: '/resume',
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
  },
];

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      logoutUser('/login');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userValidated = isUserValidated();
      // If user is not validated, then logout button should be shown.
      if (!isEmpty(userValidated)) {
        setLoggedIn(true);
      }
    }
  }, []);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const isSmall = useMediaQuery('(max-width: 1024px)');
  return (
    <>
      {isSmall ? (
        <div className="fixed z-10 inline-flex w-[100%] bg-gray-100 dark:bg-gray-900 laptop:hidden transition duration-200 ease-in-out">
          <div className="my-3 mx-8">
            <Link href="/">
              <Image
                src="/images/GaryTLogo.png"
                height={45}
                width={40.3}
                alt="site logo"
              />
            </Link>
          </div>
          <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            ref={containerRef}
          >
            <motion.div
              className="fixed bg-black top-0 z-10 "
              variants={sidebar}
            />
            <MenuToggle toggle={() => toggleOpen()} />
            <motion.ul
              className="fixed top-[50px] right-[50px] z-10 w-[150px]"
              variants={listvariants}
            >
              {navLinks.map((link, index) => {
                return (
                  <motion.li
                    className="list-none my-[20px] mx-[10px] z-10"
                    variants={itemvariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                  >
                    <ActiveLink
                      key={index}
                      href={link.path}
                      className="text-white decoration-transparent"
                      activeClassName="text-[#3e8ced]"
                      activeSubClassName="text-[#3e8ced]"
                      as={link.path}
                    >
                      <div className="nav-link">{link.name}</div>
                    </ActiveLink>
                  </motion.li>
                );
              })}
              <motion.li
                className="list-none my-[20px] mx-[10px] z-10"
                variants={itemvariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <DarkModeToggle />
              </motion.li>
            </motion.ul>
          </motion.nav>
        </div>
      ) : (
        <nav className="hidden p-8 grid-flow-row gap-4 auto-rows-fr grid-cols-2 max-w-screen-desktop m-auto laptop:grid">
          <div className="logo">
            <Link href="/">
              <Image
                src="/images/GaryTLogo.png"
                height={45}
                width={40.3}
                alt="site logo"
              />
            </Link>
          </div>
          <div className="link ml-auto">
            <ul className="grid grid-flow-col auto-cols-max content-center items-center">
              {navLinks.map((link, index) => {
                return (
                  <li className="p-3" key={index}>
                    <ActiveLink
                      className=""
                      key={index}
                      href={link.path}
                      activeClassName="text-[#3e8ced]"
                      activeSubClassName="text-[#3e8ced]"
                      as={link.path}
                    >
                      <div>{link.name}</div>
                    </ActiveLink>
                  </li>
                );
              })}
              {loggedIn && (
                <>
                  <li className="p-3">
                    <ActiveLink
                      className=""
                      href="/posts"
                      activeClassName="text-[#3e8ced]"
                      activeSubClassName="text-[#3e8ced]"
                      as="/posts"
                    >
                      <div>Posts</div>
                    </ActiveLink>
                  </li>
                  <li className="p-3">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              <li className="p-3">
                <DarkModeToggle />
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
