import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Bootstrap stores que precisam aplicar efeitos no document antes do primeiro render
import './stores/themeStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
