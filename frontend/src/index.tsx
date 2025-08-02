import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { initSmoothScroll } from './utils/smoothScroll';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initialize smooth scrolling across the application
initSmoothScroll();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
