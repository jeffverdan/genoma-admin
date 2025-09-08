// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import "../styles/globals.scss";
import Layout from "../theme/layout";
import { useRouter } from "next/router";

// Se a rota for /login, não usa layout

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {router.pathname === "/"
        ? <Component {...pageProps} />
        : <Layout>
          <Component {...pageProps} />
        </Layout>
      }
    </ThemeProvider>
  );
}
