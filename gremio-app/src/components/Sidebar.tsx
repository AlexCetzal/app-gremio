import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Sidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const linkClass = (path: string) =>
        `block px-4 py-2 rounded-md mb-2 font-medium
        ${pathname === path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`;

    // 🔥 Logout REAL con Sanctum
    const logoutReal = async () => {
        try {
            await api.post("/logout");       // cerrar sesión en Laravel
        } catch (error) {
            console.log("Error en logout:", error);
        }

        localStorage.removeItem("gremio_token"); // borrar token
        toast.success("Sesión cerrada");
        navigate("/login");
    };

    return (
        <aside className="w-60 bg-white shadow-md p-4">

            <h2 className="text-xl font-bold mb-6 text-blue-600">Gremio App</h2>

            <nav className="space-y-1">

                <Link to="/dashboard" className={linkClass("/")}>Dashboard</Link>
                <Link to="/colaboradores" className={linkClass("/colaboradores")}>Colaboradores</Link>
                <Link to="/aportaciones" className={linkClass("/aportaciones")}>Aportaciones</Link>
                <Link to="/donaciones" className={linkClass("/donaciones")}>Donaciones</Link>
                <Link to="/ventas" className={linkClass("/ventas")}>Ventas</Link>
                <Link to="/gastos" className={linkClass("/gastos")}>Gastos</Link>
                <Link to="/reportes" className={linkClass("/reportes")}>Reportes</Link>

            </nav>

            <button
                onClick={logoutReal}
                className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
                Cerrar sesión
            </button>

        </aside>
    );
}
