import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const post = data.markdownRemark;

  return (
    <Layout location={location} title={siteTitle}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
