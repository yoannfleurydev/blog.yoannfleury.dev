import React from "react";
import { Link as GatsbyLink, useStaticQuery, graphql } from "gatsby";
import {
  Box,
  Flex,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
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

  const bg = useColorModeValue("brand.100", "brand.600");
  const color = useColorModeValue("black", "white");
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const dotColor = theme.colors.black;

  return (
    <Box
      bg={bg}
      backgroundImage={`radial-gradient(${dotColor} 0.45px, transparent 0.45px), radial-gradient(${dotColor} 0.45px, ${
        colorMode === "light"
          ? theme.colors.brand["100"]
          : theme.colors.brand["600"]
      } 0.45px)`}
      opacity="0.8"
      backgroundPosition="0 0,9px 9px"
      backgroundSize="18px 18px"
    >
      <Flex
        px="2rem"
        py="1rem"
        justify="space-between"
        m="auto"
        maxW="42rem"
        color={color}
      >
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
          {data.allFile.nodes
            .filter((node) => node.childMdx)
            .map(({ childMdx: page }) => (
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
