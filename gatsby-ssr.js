import React from "react";
import theme from "./src/@chakra-ui/gatsby-plugin/theme";
import { ColorModeScript } from "@chakra-ui/react";

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ]);
};
