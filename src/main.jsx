import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "primereact/resources/themes/lara-light-cyan/theme.css";  // Tema
import "primereact/resources/primereact.min.css";                // Core
import "primeicons/primeicons.css";                              // Iconos
import "primeflex/primeflex.css";                                // Tamaños
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>,
);
