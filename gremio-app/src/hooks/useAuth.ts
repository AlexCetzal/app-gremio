import { useEffect, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const login = () => {
    // el token YA fue guardado en Login.tsx
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return { auth, login, logout };
}
