import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider, useAtom } from "jotai";
import {
  ChakraProvider,
  extendTheme,
  useColorMode,
  type ThemeConfig,
} from "@chakra-ui/react";
import { brandAtom } from "../src/store/brand";
import Layout from "../src/flat/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ChakraWrapperProvider Component={Component}>
        <Component {...pageProps} />
      </ChakraWrapperProvider>
    </Provider>
  );
}

function ChakraWrapperProvider({ children }: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [brand] = useAtom(brandAtom);
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  function forceDarkMode() {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }

  useEffect(() => {
    forceDarkMode();
  }, [colorMode, forceDarkMode]);

  const theme = extendTheme({
    ...config,
    colors: {
      brand: {
        100: "#f7fafc",
        // ...
        900: "#1a202c",
      },
    },
    styles: {
      global: () => ({
        body: {
          bg: brand.backgroundColor,
          text: "red",
        },
      }),
    },
    semanticTokens: {
      colors: {
        "chakra-body-text": { _light: brand.textColor, _dark: brand.textColor },
        // "chakra-placeholder-color": { _light: fontColors.placeholder },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Layout>{children}</Layout>
    </ChakraProvider>
  );
}

export default MyApp;
