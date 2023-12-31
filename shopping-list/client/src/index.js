import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import { ModalProvider } from './context/modal.context';
import { CallerProvider } from './context/caller.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CallerProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </CallerProvider>
  </React.StrictMode>,
);
