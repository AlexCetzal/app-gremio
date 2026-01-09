import { Navigate } from "react-router-dom";

export default function PrivateRoute({ auth, children }: any) {
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}
