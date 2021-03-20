import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export const Blockquote = (props) => {
  const bg = useColorModeValue("brand.50", "brand.800");

  return (
    <Box
      {...props}
      borderLeftColor="brand.300"
      borderLeftStyle="solid"
      borderLeftWidth={4}
      borderLeftRadius="base"
      px="1rem"
      py="0.01rem"
      my="1rem"
      bg={bg}
    />
  );
};
