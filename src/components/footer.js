import React from "react";
import { Link as GatsbyLink, useStaticQuery, graphql } from "gatsby";
import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
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
    <Box bg="brand.300">
      <Flex px="2rem" py="1rem" justify="space-between" m="auto" maxW="42rem">
        <Box>
          <Link
            href="https://github.com/yoannfleurydev"
            rel="noopener noreferrer"
            target="_blank"
            title="Lien vers la page github de Yoann Fleury"
            isExternal
          >
            github <Icon boxSize={3} as={FaExternalLinkAlt} />
          </Link>{" "}
          &bull;{" "}
          <Link
            href="https://twitter.com/yoannfleurydev"
            rel="noopener noreferrer"
            target="_blank"
            title="Lien vers la page twitter de Yoann Fleury"
            isExternal
          >
            twitter <Icon boxSize={3} as={FaExternalLinkAlt} />
          </Link>{" "}
          {data.allFile.nodes.map(({ childMdx: page }) => (
            <React.Fragment key={page.fields.slug}>
              {" "}
              &bull;{" "}
              <GatsbyLink to={page.fields.slug}>
                {page.frontmatter.title.toLowerCase()}
              </GatsbyLink>
            </React.Fragment>
          ))}
        </Box>
        <Box>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
