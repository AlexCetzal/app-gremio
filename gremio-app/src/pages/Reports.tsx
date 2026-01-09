import { useState, useEffect } from "react";

export default function Reports() {
  // Datos simulados (LOCALES)
  const [collaborators, setCollaborators] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [donations, setDonations] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // IMPORTANTE:
  // En la integración con Laravel, estos datos vendrán desde la API.
  useEffect(() => {
    setCollaborators([
      { id: 1, name: "Juan Pérez" },
      { id: 2, name: "María López" },
    ]);

    setContributions([
      { id: 1, collaborator_id: 1, amount: 1000, type: "obligatoria", date: "2024-01-15" },
      { id: 2, collaborator_id: 2, amount: 200, type: "adicional", date: "2024-01-18" },
    ]);

    setDonations([
      { id: 1, product: "Azúcar", quantity: 2, unit: "kg", estimated_value: 40 },
      { id: 2, product: "Arroz", quantity: 3, unit: "kg", estimated_value: 60 },
    ]);

    setSales([
      { id: 1, event_type: "Venta de antojitos", amount: 1500, date: "2024-01-12" },
      { id: 2, event_type: "Rifas", amount: 800, date: "2024-01-18" },
    ]);

    setExpenses([
      { id: 1, concept: "Flores", amount: 300, date: "2024-01-05" },
      { id: 2, concept: "Bebidas", amount: 250, date: "2024-01-16" },
    ]);
  }, []);

  // ==========================
  // CÁLCULOS IMPORTANTES
  // ==========================

  const totalObligatorias = contributions
    .filter((c) => c.type === "obligatoria")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalAdicionales = contributions
    .filter((c) => c.type === "adicional")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalAportaciones = totalObligatorias + totalAdicionales;

  const totalDonacionesValor = donations.reduce(
    (sum, d) => sum + d.estimated_value,
    0
  );

  const totalVentas = sales.reduce((sum, s) => sum + s.amount, 0);

  const totalIngresos = totalAportaciones + totalVentas + totalDonacionesValor;

  const totalGastos = expenses.reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIngresos - totalGastos;

  // ==========================
  // COMPONENTE VISUAL
  // ==========================

  const Card = ({ title, value, color }: any) => (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">$ {value.toLocaleString()}</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reportes generales</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Card title="Aportaciones obligatorias"
              value={totalObligatorias}
              color="bg-blue-600" />

        <Card title="Aportaciones adicionales"
              value={totalAdicionales}
              color="bg-blue-500" />

        <Card title="Total aportaciones"
              value={totalAportaciones}
              color="bg-blue-700" />

        <Card title="Donaciones (valor estimado)"
              value={totalDonacionesValor}
              color="bg-green-600" />

        <Card title="Ventas de comida"
              value={totalVentas}
              color="bg-indigo-600" />

        <Card title="Total de ingresos"
              value={totalIngresos}
              color="bg-green-700" />

        <Card title="Gastos"
              value={totalGastos}
              color="bg-red-600" />

        <Card title="Balance final"
              value={balance}
              color={balance >= 0 ? "bg-emerald-600" : "bg-red-700"} />

      </div>
    </div>
  );
}
