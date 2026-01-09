import { BrowserRouter, Routes, Route } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Collaborators from "../pages/Collaborators";
import Contributions from "../pages/Contributions";
import Donations from "../pages/Donations";
import Sales from "../pages/Sales";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";

import MainLayout from "../layout/MainLayout";

export default function AppRouter() {

  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PRIVADAS */}
        <Route
          element={
            <PrivateRoute auth={auth}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/colaboradores" element={<Collaborators />} />
          <Route path="/aportaciones" element={<Contributions />} />
          <Route path="/donaciones" element={<Donations />} />
          <Route path="/ventas" element={<Sales />} />
          <Route path="/gastos" element={<Expenses />} />
          <Route path="/reportes" element={<Reports />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
