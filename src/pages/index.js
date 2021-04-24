import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Box, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.nodes;

  const hColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Tous les posts" />
      <Bio mt="1rem" />
      {posts.map((post) => {
        const title = post.frontmatter.title || post.parent.relativeDirectory;
        return (
          <Box key={post.frontmatter.title}>
            <Heading
              as="h2"
              color={hColor}
              fontWeight="bolder"
              size="lg"
              mt="2rem"
            >
              <Link
                as={GatsbyLink}
                to={post.parent.relativeDirectory}
                _hover={{
                  textDecoration: "underline",
                }}
              >
                {title}
              </Link>
            </Heading>
            <Text
              as="time"
              dateTime={post.frontmatter.datetime}
              fontSize="small"
            >
              {post.frontmatter.date}
            </Text>
            <p
              dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }}
            />
          </Box>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        excerpt
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          datetime: date
          title
          published
        }
        parent {
          ... on File {
            name
            relativeDirectory
          }
        }
      }
    }
  }
`;
