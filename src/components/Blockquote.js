import React from "react";
import { Text } from "@chakra-ui/react";

export const Blockquote = (props) => {
  return (
    <Text
      {...props}
      borderLeftColor="brand.300"
      borderLeftStyle="solid"
      borderLeftWidth={4}
      pl="1rem"
      my="1rem"
    />
  );
};
