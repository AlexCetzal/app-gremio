import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Todos los campos son obligatorios");
    }

    try {
      const { data } = await api.post("/login", { email, password });

      // guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      login();
      toast.success("Inicio de sesión exitoso");

      // 🔀 redirección por rol
      switch (data.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "developer":
          navigate("/develop");
          break;
        default:
          navigate("/dashboard");
          break;
      }

    } catch (error) {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Gremio App
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button className="bg-blue-600 text-white p-2 rounded-md">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
