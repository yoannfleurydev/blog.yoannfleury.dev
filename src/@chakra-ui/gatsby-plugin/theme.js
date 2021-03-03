import { extendTheme } from "@chakra-ui/react";
import typography from "../../theme/typography";

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
};

const theme = extendTheme({
  colors,
  ...typography,
  styles: {
    global: {
      body: {
        backgroundColor: "brand.200",
        border: "8px solid",
        borderColor: "brand.200",
      },
      a: {
        boxShadow: "none",
      },
    },
  },
});

export default theme;
