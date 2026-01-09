import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import api from "../services/api";

type Expense = {
  id: number;
  concept: string;
  amount: number;
  responsible_id: number | null;
  date: string;
  notes?: string;
};

type Collaborator = {
  id: number;
  name: string;
};

export default function Expenses() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    fetchCollaborators();
    fetchExpenses();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch {
      toast.error("Error al cargar colaboradores");
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch {
      toast.error("Error al cargar gastos");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [responsible, setResponsible] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setConcept("");
    setAmount("");
    setResponsible("");
    setDate("");
    setNotes("");
    setEditing(null);
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item: Expense) => {
    setEditing(item);
    setConcept(item.concept);
    setAmount(item.amount.toString());
    setResponsible(item.responsible_id ? item.responsible_id.toString() : "");
    setDate(item.date);
    setNotes(item.notes || "");
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!concept) return toast.error("El concepto es obligatorio");
    if (!amount) return toast.error("El monto es obligatorio");
    if (!date) return toast.error("Seleccione una fecha");

    const data = {
      concept,
      amount: Number(amount),
      responsible_id: responsible ? Number(responsible) : null,
      date,
      notes,
    };

    try {
      if (editing) {
        await api.put(`/expenses/${editing.id}`, data);
        toast.success("Gasto actualizado");
      } else {
        await api.post("/expenses", data);
        toast.success("Gasto registrado");
      }

      setOpenModal(false);
      resetForm();
      fetchExpenses();

    } catch {
      toast.error("Error al guardar gasto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar gasto?")) return;

    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Eliminado correctamente");
      fetchExpenses();
    } catch {
      toast.error("Error al eliminar gasto");
    }
  };

  const getResponsibleName = (id: number | null) =>
    collaborators.find((c) => c.id === id)?.name ?? "No asignado";

  return (
    <div>
      <h1 className="text-3xl font-bold">Gastos</h1>

      <button
        onClick={openAddModal}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        + Registrar gasto
      </button>

      <div className="mt-6">
        <Table
          columns={[
            { label: "Concepto", field: "concept" },
            { label: "Monto", field: "amount" },
            { label: "Responsable", field: "resp" },
            { label: "Fecha", field: "date" },
          ]}
          data={expenses.map((e) => ({
            ...e,
            amount: `$${e.amount}`,
            resp: getResponsibleName(e.responsible_id),
          }))}
          actions={(item) => (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded-md"
                onClick={() => openEditModal(item)}
              >
                Editar
              </button>

              <button
                className="px-2 py-1 bg-red-600 text-white rounded-md"
                onClick={() => handleDelete(item.id)}
              >
                Eliminar
              </button>
            </div>
          )}
        />
      </div>

      <Modal
        open={openModal}
        title={editing ? "Editar gasto" : "Registrar gasto"}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4">

          <Input
            label="Concepto"
            value={concept}
            onChange={setConcept}
            placeholder="Ej: Flores, Música, etc."
          />

          <Input
            label="Monto"
            value={amount}
            type="number"
            onChange={setAmount}
          />

          <Select
            label="Responsable"
            value={responsible}
            onChange={setResponsible}
            options={[
              { label: "Sin responsable", value: "" },
              ...collaborators.map((c) => ({
                label: c.name,
                value: c.id,
              })),
            ]}
          />

          <Input
            label="Fecha"
            value={date}
            type="date"
            onChange={setDate}
          />

          <Input
            label="Notas"
            value={notes}
            onChange={setNotes}
            placeholder="Notas opcionales"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Guardar
          </button>

        </div>
      </Modal>

    </div>
  );
}
