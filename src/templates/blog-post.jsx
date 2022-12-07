import React from "react";
import { Link, graphql } from "gatsby";
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
import Seo from "components/seo";

const BlogPostTemplate = ({ data, location, children }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = data;
  const post = data.mdx;

  const hColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        ogImage={post.frontmatter?.ogImage?.childImageSharp?.original?.src}
      />
      <Heading as="h1" color={hColor} mt={8} fontWeight={800} size="2xl">
        {post.frontmatter.title}
      </Heading>
      <Text
        as="time"
        dateTime={post.frontmatter.datetime}
        fontSize="sm"
        my="1rem"
      >
        {post.frontmatter.date}
      </Text>
      {children}
      <Divider my={8} />
      <Bio />

      <Flex flexWrap="wrap" justifyContent="space-between" mt="2rem">
        <Box _hover={{ textDecoration: "underline" }}>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </Box>
        <Box _hover={{ textDecoration: "underline" }}>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        datetime: date
        description
        ogImage {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
      fields {
        slug
      }
      body
    }
    previous: mdx(id: { eq: $previousPostId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
