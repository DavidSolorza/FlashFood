import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import App from './App';
import { ProveedorGlobal } from './contextoGlobal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProveedorGlobal>
    <App />
  </ProveedorGlobal>
);


