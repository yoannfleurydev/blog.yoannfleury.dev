import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Bio from "components/bio";
import Layout from "components/layout";
import SEO from "components/seo";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { post, previous, next } = pageContext;

  const hColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.childMdx.frontmatter.title}
        description={
          post.childMdx.frontmatter.description || post.childMdx.excerpt
        }
        ogImage={
          post.childMdx.frontmatter?.ogImage?.childImageSharp?.original?.src
        }
      />
      <Heading as="h1" color={hColor} mt={8} fontWeight={800} size="2xl">
        {post.childMdx.frontmatter.title}
      </Heading>
      <Text
        as="time"
        dateTime={post.childMdx.frontmatter.datetime}
        fontSize="sm"
        my="1rem"
      >
        {post.childMdx.frontmatter.date}
      </Text>
      <MDXRenderer>{post.childMdx.body}</MDXRenderer>
      <Divider my={8} />
      <Bio />

      <Flex flexWrap="wrap" justifyContent="space-between" mt="2rem">
        <Box _hover={{ textDecoration: "underline" }}>
          {previous && (
            <Link to={previous.childMdx.fields.slug} rel="prev">
              ← {previous.childMdx.frontmatter.title}
            </Link>
          )}
        </Box>
        <Box _hover={{ textDecoration: "underline" }}>
          {next && (
            <Link to={next.childMdx.fields.slug} rel="next">
              {next.childMdx.frontmatter.title} →
            </Link>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
