import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Flex, Heading, Link, useColorModeValue } from "@chakra-ui/react";
import Footer from "./footer";
import { Provider } from "./MDX/Provider";

const Layout = ({ location, title, children }) => {
  const bg = useColorModeValue("white", "black");

  const rootPath = `${__PATH_PREFIX__}/`;
  const headerProps =
    location.pathname === rootPath
      ? { as: "h1", size: "2xl" }
      : { as: "h3", size: "lg" };

  return (
    <Box bg={bg}>
      <Box mx="auto" maxW="44rem" py="2.6rem" px="1.3rem">
        <header>
          <Heading {...headerProps}>
            <Link as={GatsbyLink} to={`/`} boxShadow="none">
              {title}
            </Link>
          </Heading>
        </header>
        <Flex as="main" direction="column">
          <Provider>{children}</Provider>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
