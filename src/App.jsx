import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthPanel from "./pages/AuthPanel";
import Layaout from "./pages/Layaout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        {/* Notificaciones flotantes */}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

        <Routes>
          <Route path="/" element={<AuthPanel />} />
          <Route path="/auth" element={<AuthPanel />} />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Layaout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Layaout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
