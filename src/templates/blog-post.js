import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Bio from "components/bio";
import Layout from "components/layout";
import SEO from "components/seo";
import { rhythm, scale } from "utils/typography";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { post, previous, next } = pageContext;

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
      <h1>{post.childMdx.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post.childMdx.frontmatter.date}
      </p>
      <MDXRenderer>{post.childMdx.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.childMdx.fields.slug} rel="prev">
              ← {previous.childMdx.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.childMdx.fields.slug} rel="next">
              {next.childMdx.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
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
