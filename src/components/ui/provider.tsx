"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defaultSystem,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        //       primary: { value: "#f5e6c8" },
        secondary: { value: "#191d25" },
      },
    },
    semanticTokens: {
      colors: {
        myColor: {
          value: { /* base: "{colors.primary}",*/ _dark: "{colors.secondary}" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
