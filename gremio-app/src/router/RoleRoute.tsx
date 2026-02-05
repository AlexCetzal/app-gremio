import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

interface Props {
  role: "admin" | "developer" | "user";
  children: JSX.Element;
}

export default function RoleRoute({ role, children }: Props) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { role: userRole } = JSON.parse(user);

  // ❌ No tiene permiso
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Tiene permiso
  return children;
}
