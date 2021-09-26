import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import KeyboardProvider from "./context/KeyboardProvider";
import SettingsProvider from "./context/SettingsProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import "./index.css";
import ApplierProvider from "./context/ApplierProvider";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SettingsProvider>
        <ApplierProvider>
          <KeyboardProvider>
            <App />
          </KeyboardProvider>
        </ApplierProvider>
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Basic Architecture
// App
//   ContextProviders
//       - Settings
//       - Keyboard
//     KeyPrinter
//     Interface
//     Scene
//        - useContextBridge
