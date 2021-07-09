import React from "react"
import Layout from "../../components/layout"
import Page from "../../components/page"
import SEO from "../../components/seo"
// import { getElementorCssLinksData, getElementorJsLinksData } from "../../utils/elementor";
import { getElementorCssLinksData } from "../../utils/elementor"
import { Helmet } from "react-helmet"
import BodyClassName from "react-body-classname"

const FrontPage = ({ pageContext }) => {
  const postId = pageContext?.databaseId
  const elementorCssLinksData = getElementorCssLinksData(postId)
  const hasElementorSupport = "false" !== process.env.GATSBY_ELEMENTOR_SUPPORT

  // const elementorJsLinksData = getElementorJsLinksData();

  return (
    <Layout>
      <SEO
        title="Phoenix: Gatsby WordPress Theme"
        seo={pageContext?.page?.seo}
        uri={pageContext?.uri}
      />
      <Helmet>
        {hasElementorSupport &&
          elementorCssLinksData.length &&
          elementorCssLinksData.map(linkData => (
            <link
              key={linkData?.id}
              rel="stylesheet"
              id={linkData?.id}
              href={linkData?.link}
              media="all"
            />
          ))}
        {/* {
					hasElementorSupport && elementorJsLinksData.length && elementorJsLinksData.map( linkData => (
						<script key={linkData?.id} id={linkData?.id} src={linkData?.link} />
					) )
				} */}
      </Helmet>
      <BodyClassName className={pageContext?.bodyClasses} />
      <Page data={pageContext} />
    </Layout>
  )
}
export default FrontPage
