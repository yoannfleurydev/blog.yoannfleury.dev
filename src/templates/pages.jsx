import React from "react";
import { graphql } from "gatsby";
import { Heading } from "@chakra-ui/react";
import Layout from "components/layout";
import Seo from "components/seo";

const Pages = ({ data, location, children }) => {
  const siteTitle = data.site.siteMetadata.title;
  const post = data.file.childMdx;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.frontmatter.title} />
      <Heading as="h1" color="brand.500" mt={8} fontWeight={800} size="2xl">
        {post.frontmatter.title}
      </Heading>

      {children}
    </Layout>
  );
};

export default Pages;

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    file(id: { eq: $id }) {
      name
      childMdx {
        body
        frontmatter {
          title
        }
      }
    }
  }
`;
