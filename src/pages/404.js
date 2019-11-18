import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  return (
    <Layout location={location} title={title}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>
        Cette page n'existe plus, ou alors n'existait pas du tout.{" "}
        <span role="img" aria-label="emoji pensif">
          🤔
        </span>
      </p>
      <img
        src="https://media.giphy.com/media/bMnnmNo087fgs/giphy.gif"
        alt="Chat sur un robot aspirateur"
      />
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
