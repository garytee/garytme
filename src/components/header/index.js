/**
 * External dependencies.
 */
import PropTypes from 'prop-types';
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

/**
 * Internal dependencies.
 */
import { Header } from "./header-static";

/**
 * Default Header Component Export.
 *
 * @return {*}
 */
export default ( props ) => {

	return (
		<StaticQuery
			query={ graphql`
				    query headerQueryAndHeaderQuery {
					  wp {
					    header: getHeader {
					      siteLogoUrl
					      siteTagLine
					      siteTitle
					      favicon
					    }
					  }
					  headerMenuItems: allWpMenuItem(filter: {locations: {eq: HWP_MENU_HEADER}}) {
					    nodes {
          id
          databaseId
          title: label
          path
          target
          parent: parentId
        }
					  }
				    }
				` }
			render={ data => (
				<>
					<Header data={ data }/>
				</>
			) }
		/>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: 'Gatsby WooCommerce Theme',
	data: {
		wp: {}
	},
};
