import Icon from "@chakra-ui/icon";
import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import { MdWarning } from "react-icons/md";

export const Warning = ({ children }) => (
  <Flex
    shadow="base"
    borderStyle="solid"
    borderColor="brand.500"
    borderWidth="0.5rem"
    borderRadius="base"
    alignItems="center"
    p="1rem"
    my="2rem"
  >
    <Icon as={MdWarning} w={8} h={8} color="brand.500" />{" "}
    <Text ml="1rem">{children}</Text>
  </Flex>
);
