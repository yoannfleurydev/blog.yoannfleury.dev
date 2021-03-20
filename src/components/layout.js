import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Heading, Link } from "@chakra-ui/react";
import Footer from "./footer";
import { Provider } from "./MDX/Provider";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const headerProps =
    location.pathname === rootPath
      ? { as: "h1", size: "2xl" }
      : { as: "h3", size: "lg" };

  return (
    <Box bg="white">
      <Box mx="auto" maxW="42rem" py="2.6rem" px="1.3rem">
        <header>
          <Heading {...headerProps}>
            <Link as={GatsbyLink} to={`/`} boxShadow="none">
              {title}
            </Link>
          </Heading>
        </header>
        <main>
          <Provider>{children}</Provider>
        </main>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
