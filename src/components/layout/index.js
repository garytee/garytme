/**
 * Layout component contains header and footer
 *
 * @package gatsby-wordpress-theme
 */

import React from "react"
import PropTypes from "prop-types"
// import PageTransition from 'gatsby-plugin-page-transitions';


import './../../sass/common.scss';

import Header from "../header";
import Footer from "../footer";

import { motion } from "framer-motion"


const Layout = ( { children }) => {
  return (
    <>
      <Header />
      <main className="main-container">
        <motion.main
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{
            // type: "spring",
            // mass: 0.35,
            // stiffness: 75,
            // duration: 0.3,
            duration: 0.7,
            ease: [0.9, -0.05, 0.01, 0.99],
          }}
        >
          {children}
        </motion.main>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
