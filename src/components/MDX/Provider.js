import React from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  Code,
  Heading,
  Text,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Blockquote } from "components/Blockquote";
import { CodeBlock } from "components/CodeBlock";
import { Link } from "components/Link";

// eslint-disable-next-line jsx-a11y/heading-has-content
const H1 = (props) => (
  <Heading as="h1" mt="3rem" mb="2rem" size="2xl" {...props} />
);
const H2 = (props) => <Heading as="h2" mt="2rem" mb="1rem" {...props} />;
const Paragraph = (props) => <Text my="1rem" {...props} />;
const InlineCode = (props) => (
  <Code colorScheme="brand" px="0.4rem" {...props} />
);
const Pre = (props) => <Box overflow="auto" bg="darcula.800" {...props} />;

const components = {
  h1: H1,
  h2: H2,
  p: Paragraph,
  blockquote: Blockquote,
  a: Link,
  ul: UnorderedList,
  ol: OrderedList,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
};

export const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
