import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider storageKey="chakra-ui-color-mode">
      <App />
    </Provider>
  </React.StrictMode>
);
