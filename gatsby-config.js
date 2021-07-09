require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: `Gatsby WooCommerce Elementor Theme`,
    description: `Gatsby WooCommerce Elementor Theme`,
  siteUrl: `${ process.env.GATSBY_SITE_URL }`,
  wordPressSiteUrl: `${ process.env.WORDPRESS_SITE_URL }`,
    author: `@garytee`,
  fbAppId: `${ process.env.FB_APP_ID }`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: `${ process.env.GOOGLE_TAGMANAGER_ID }`,
        includeInDevelopment: false,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${ process.env.WORDPRESS_SITE_URL }/graphql`,
        verbose: true,
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `${ process.env.GATSBY_SITE_URL }`,
        sitemap: `${ process.env.GATSBY_SITE_URL }/sitemap.xml`,
        policy: [{ userAgent: "*", allow: ["/"] }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby WooCommerce Elementor Theme`,
        short_name: `Gatsby WooCommerce Elementor Theme`,
        start_url: `/`,
        background_color: `#eaeaea`,
        theme_color: `#1e1e1e`,
        display: `standalone`,
        icon: `${__dirname}/src/images/favicon.png`, // For favicon- This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
