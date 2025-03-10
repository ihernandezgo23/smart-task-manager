import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router'; // Import the Router file
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRouter /> {/* Use AppRouter to handle routing */}
  </React.StrictMode>
);