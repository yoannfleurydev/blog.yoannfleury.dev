import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({
  data: {
    notFound: { publicURL },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  return (
    <Layout location={location} title={title}>
      <Seo title="404: Not Found" />
      <h1>Not Found</h1>
      <p>
        Cette page n'existe plus, ou alors n'existait pas du tout.{" "}
        <span role="img" aria-label="emoji pensif">
          🤔
        </span>
      </p>
      <img src={publicURL} alt="404 Not Found" />
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    notFound: file(absolutePath: { regex: "/404.gif/" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
