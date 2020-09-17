import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Tous les posts" />
      <Bio />
      {posts.map((post) => {
        const title = post.frontmatter.title || post.parent.relativeDirectory;
        return (
          <div key={post.frontmatter.title}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                style={{ boxShadow: `none` }}
                to={post.parent.relativeDirectory}
              >
                {title}
              </Link>
            </h3>
            <small>{post.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }}
            />
          </div>
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
