import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Users() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== "admin" && user.role !== "developer") {
    return <p>No tienes permiso para ver esta página</p>;
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users", form);
      toast.success("Usuario creado correctamente");
      setForm({ name: "", email: "", password: "" });
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("No tienes permisos");
      } else {
        toast.error("Error al crear usuario");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <button type="submit">Crear usuario</button>
    </form>
  );
}
