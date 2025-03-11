import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defaultSystem,
  defineConfig,
} from "@chakra-ui/react";

import App from "./App";
import { BsFillAlarmFill } from "react-icons/bs";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
