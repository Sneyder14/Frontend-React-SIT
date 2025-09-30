import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotificacionesProvider } from './context/NotificacionesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import "./utils/axiosConfig.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NotificacionesProvider>
        <App />
      </NotificacionesProvider>
    </AuthProvider>
  </StrictMode>
);

