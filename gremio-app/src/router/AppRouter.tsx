import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Collaborators from "../pages/Collaborators";
import Contributions from "../pages/Contributions";
import Donations from "../pages/Donations";
import Sales from "../pages/Sales";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";

import Admin from "../pages/admin/Admin";
import Develop from "../pages/develop/Develop";

import MainLayout from "../layout/MainLayout";

export default function AppRouter() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* RUTA RAÍZ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/*"
          element={
            <PrivateRoute auth={auth}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* ================= USER ================= */}
          <Route
            path="dashboard"
            element={
              <RoleRoute role="user">
                <Dashboard />
              </RoleRoute>
            }
          />

          <Route
            path="colaboradores"
            element={
              <RoleRoute role="user">
                <Collaborators />
              </RoleRoute>
            }
          />

          <Route
            path="aportaciones"
            element={
              <RoleRoute role="user">
                <Contributions />
              </RoleRoute>
            }
          />

          <Route
            path="donaciones"
            element={
              <RoleRoute role="user">
                <Donations />
              </RoleRoute>
            }
          />

          <Route
            path="ventas"
            element={
              <RoleRoute role="user">
                <Sales />
              </RoleRoute>
            }
          />

          <Route
            path="gastos"
            element={
              <RoleRoute role="user">
                <Expenses />
              </RoleRoute>
            }
          />

          <Route
            path="reportes"
            element={
              <RoleRoute role="user">
                <Reports />
              </RoleRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="admin"
            element={
              <RoleRoute role="admin">
                <Admin />
              </RoleRoute>
            }
          />


          {/* ================= DEVELOPER ================= */}
          <Route
            path="develop"
            element={
              <RoleRoute role="developer">
                <Develop />
              </RoleRoute>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
