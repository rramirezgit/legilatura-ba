import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextTheme } from "../context/Auth";
import Certificaciones from "../pages/certificaciones";
import CertificacionesById from "../pages/certificacionesById";
import ListaTramites from "../pages/listaTramites";
import Login from "../pages/login";

const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListaTramites />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/administracion_certificaciones/:id"
          element={
            <ProtectedRoute>
              <CertificacionesById />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administracion_certificaciones"
          element={
            <ProtectedRoute>
              <Certificaciones />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContextTheme);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Navigator;
