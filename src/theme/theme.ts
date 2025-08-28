// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A884", // Verde Genoma
    },
    secondary: {
      main: "#FF6B00", // Laranja
    },
    background: {
      default: "#F9FAFB",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
