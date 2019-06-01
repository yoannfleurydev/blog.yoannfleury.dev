import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
