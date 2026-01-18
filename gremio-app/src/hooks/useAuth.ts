import { useEffect, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const login = () => {
    // ❌ NO guardar token aquí
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return { auth, login, logout };
}
