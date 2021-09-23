import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import KeyboardProvider from './context/KeyboardProvider';
import SettingsProvider from './context/SettingsProvider';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
    <KeyboardProvider>
      <App />
    </KeyboardProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
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