import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import { ModalProvider } from './context/modal.context';
import { CallerProvider } from './context/caller.context';
import { AlertProvider } from './context/alert.context';
import Alert from './components/Alert';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CallerProvider>
      <ModalProvider>
        <AlertProvider>
          <Router />
          <Alert />
        </AlertProvider>
      </ModalProvider>
    </CallerProvider>
  </React.StrictMode>,
);
