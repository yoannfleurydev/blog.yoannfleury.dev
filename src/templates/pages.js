import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Heading } from "@chakra-ui/react";
import Layout from "components/layout";
import SEO from "components/seo";

const Pages = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { post } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} />
      <Heading as="h1" color="brand.500" mt={8} fontWeight={800} size="2xl">
        {post.frontmatter.title}
      </Heading>
      <MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  );
};

export default Pages;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
