import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      return toast.error("Todos los campos son obligatorios");
    }

    // Simulación del login
    login();

    toast.success("Inicio de sesión exitoso");
    navigate("/");
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

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  );
}
