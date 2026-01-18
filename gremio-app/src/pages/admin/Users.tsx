import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Users() {
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
    } catch (error) {
      toast.error("Error al crear usuario");
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
