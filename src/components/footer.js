import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(filter: { fields: { type: { eq: "pages" } } }) {
            edges {
              node {
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const pages = data.allMarkdownRemark.edges.map((edge) => ({
          title: edge.node.frontmatter.title,
          slug: edge.node.fields.slug,
        }));

        return (
          <footer>
            <div style={{ float: "right" }}>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                rss
              </a>
            </div>
            <a
              href="https://github.com/yoannfleurydev"
              rel="noopener noreferrer"
              target="_blank"
              title="Lien vers la page github de Yoann Fleury"
            >
              github
            </a>{" "}
            &bull;{" "}
            <a
              href="https://mobile.twitter.com/yoannfleurydev"
              rel="noopener noreferrer"
              target="_blank"
              title="Lien vers la page twitter de Yoann Fleury"
            >
              twitter
            </a>{" "}
            &bull; <Link to="/photos">photos</Link>
            {pages.map((page) => (
              <React.Fragment key={page.slug}>
                {" "}
                &bull; <Link to={page.slug}>{page.title.toLowerCase()}</Link>
              </React.Fragment>
            ))}
            <p>
              © {new Date().getFullYear()}, Mis à disposition grâce à{` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </p>
          </footer>
        );
      }}
    ></StaticQuery>
  );
};
