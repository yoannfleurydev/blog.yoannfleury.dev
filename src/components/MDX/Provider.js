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
import { slug } from "utils/slug";

const generatePermalink = (props) => (
  <Link
    href={`#${slug(props.children)}`}
    title={`Permalien vers ${props.children}`}
    {...props}
  />
);

const H1 = (props) => (
  <Heading
    as="h1"
    mt="3rem"
    mb="2rem"
    size="2xl"
    id={slug(props.children)}
    {...props}
  >
    {generatePermalink(props)}
  </Heading>
);
const H2 = (props) => (
  <Heading as="h2" mt="2rem" mb="1rem" id={slug(props.children)}>
    {generatePermalink(props)}
  </Heading>
);
const H3 = (props) => {
  const id = slug(props.children);

  return (
    <Heading as="h3" size="lg" mt="1.8" mb="0.9" color="brand.900" id={id}>
      {generatePermalink(props)}
    </Heading>
  );
};
const Paragraph = (props) => <Text my="1rem" {...props} />;
const InlineCode = (props) => (
  <Code colorScheme="brand" px="0.4rem" {...props} />
);
const Pre = (props) => <Box overflow="auto" bg="darcula.800" {...props} />;

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
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
