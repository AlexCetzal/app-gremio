import { useEffect, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("gremio_token");
    setAuth(!!token);
  }, []);

  const login = () => {
    localStorage.setItem("gremio_token", "TOKEN_FALSO");
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("gremio_token");
    setAuth(false);
  };

  return { auth, login, logout };
}
