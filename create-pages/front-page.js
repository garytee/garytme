const { slash } = require(`gatsby-core-utils`)
const frontPageTemplate = require.resolve(
  `../src/templates/front-page/index.js`
)
const singleProductPageTemplate = require.resolve(
  `../src/templates/product/index.js`
)
const { ProductsFragment } = require("./fragements/products/index.js")

const { ImageFragment } = require("./fragements/image/index")

const { SeoFragment } = require("./fragements/seo/index.js")

// Get all the front page data.
const GET_FRONT_PAGE = `
query GET_FRONT_PAGE {
  pages: allWpPage(filter: {isFrontPage: {eq: true}}) {
    nodes {
      id
      databaseId
      bodyClasses
      title
      content
      date
      uri
      slug
      seo {
        ...SeoFragment
      }
      featuredImage {
        node {
		  ...ImageFragment
        }
      }
    }
  }
  categories: allWpProductCategory(limit: 5) {
    nodes {
      id
      name
      uri
    }
  }
}
${ImageFragment}
${SeoFragment}
`

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  const fetchPosts = async () => {
    // Do query to get all pages and categories, this will return the pages and categories.
    return await graphql(GET_FRONT_PAGE).then(({ data }) => {
      const { pages, categories } = data

      return { pages: pages.nodes, categoriesData: categories.nodes }
    })
  }

  // When the above fetchPosts is resolved, then loop through the results i.e pages to create pages.
  await fetchPosts().then(({ pages, categoriesData }) => {
    // 2. Create Single PAGE: Loop through all pages and create single pages for pages.
    pages &&
      pages.map(page => {
        // If its not a custom template, create the page.
        // if (
        //   !customTemplatesUris.includes(page.uri) &&
        //   !customTemplateSlugs.includes(page.slug)
        // ) 
        {
          createPage({
            path: `/`,
            component: slash(frontPageTemplate),
            context: { ...page, categoriesData }, // pass single page data in context, so its available in the singlePageTemplate in props.pageContext.
          })
        }
      })
  })
}
