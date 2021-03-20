import React from "react";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";

export const Link = (props) => {
  const color = useColorModeValue("brand.500", "brand.300");
  const hoverColor = useColorModeValue("brand.600", "brand.200");

  return (
    <ChakraLink
      color={color}
      _hover={{ color: hoverColor, textDecoration: "underline" }}
      {...props}
    />
  );
};
