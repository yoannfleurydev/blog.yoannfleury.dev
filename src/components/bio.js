import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import { Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

function Bio(props) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <Flex {...props}>
      <Image
        as={GatsbyImage}
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        borderRadius="100%"
        minWidth={50}
        mr="1rem"
      />
      <Text>
        Blog personnel de{" "}
        <Link
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          textDecoration="underline"
          isExternal
        >
          {author} <Icon as={FaExternalLinkAlt} boxSize={3} />
        </Link>
        . Vous pouvez y trouver des articles sur mes découvertes dans le monde
        du développement ou autre sujet qui m'intéresse.{` `}
      </Text>
    </Flex>
  );
}

export default Bio;
