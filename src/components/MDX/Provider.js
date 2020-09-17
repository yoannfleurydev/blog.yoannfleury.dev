import React from "react";
import { MDXProvider } from "@mdx-js/react";

// eslint-disable-next-line jsx-a11y/heading-has-content
const H1 = (props) => <h1 {...props} />;
const Paragraph = (props) => <p {...props} />;

const components = {
  h1: H1,
  p: Paragraph,
};

export const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
