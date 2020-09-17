import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
        nodes {
          childMdx {
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
  `);

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
        href="https://twitter.com/yoannfleurydev"
        rel="noopener noreferrer"
        target="_blank"
        title="Lien vers la page twitter de Yoann Fleury"
      >
        twitter
      </a>{" "}
      &bull; <Link to="/photos">photos</Link>
      {data.allFile.nodes.map(({ childMdx: page }) => (
        <React.Fragment key={page.fields.slug}>
          {" "}
          &bull;{" "}
          <Link to={page.fields.slug}>
            {page.frontmatter.title.toLowerCase()}
          </Link>
        </React.Fragment>
      ))}
    </footer>
  );
};
