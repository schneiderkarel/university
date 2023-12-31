import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalProvider } from './context/modal.context';
import { CallerProvider } from './context/caller.context';
import { AlertProvider } from './context/alert.context';
import App from './App';
import { ThemeProvider } from './context/theme.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CallerProvider>
        <ModalProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </ModalProvider>
      </CallerProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
