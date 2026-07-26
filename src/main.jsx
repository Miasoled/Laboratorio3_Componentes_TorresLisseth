import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
});

const theme = createTheme({
  palette: {
    primary: { main: "#078f92", dark: "#056a70", contrastText: "#ffffff" },
    secondary: { main: "#91c83e", dark: "#659929" },
    background: { default: "#f4f9f7", paper: "#ffffff" },
    text: { primary: "#132f34", secondary: "#61767a" },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Manrope", "Inter", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Manrope", "Inter", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Manrope", "Inter", sans-serif', fontWeight: 750 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12, minHeight: 44 } } },
    MuiTextField: { defaultProps: { variant: "outlined", fullWidth: true } },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
