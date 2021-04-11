import { extendTheme } from "@chakra-ui/react";
import typography from "../../theme/typography";
import * as foundations from "../../theme/foundations";

const colors = {
  brand: {
    50: "#ffe9eb",
    100: "#efc5c9",
    200: "#df9fa6",
    300: "#d17b83",
    400: "#c3565f",
    500: "#a93c46",
    600: "#842e36",
    700: "#602027",
    800: "#3b1216",
    900: "#1b0305",
  },
  // Theme for CodeBlocks
  darcula: {
    50: "#eef1f9",
    100: "#d3d4df",
    200: "#b6b8c6",
    300: "#999bb0",
    400: "#7b7f99",
    500: "#626580",
    600: "#4c4f64",
    700: "#373848",
    800: "#282a37",
    900: "#0b0b14",
  },
};

const theme = extendTheme({
  colors,
  ...foundations,
  ...typography,
  styles: {
    global: ({ colorMode }) => ({
      body: {
        backgroundColor: colorMode === "light" ? "brand.200" : "brand.800",
        border: "8px solid",
        borderColor: colorMode === "light" ? "brand.200" : "brand.800",
      },
      a: {
        boxShadow: "none",
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  },
});

export default theme;
