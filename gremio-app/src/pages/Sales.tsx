import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import api from "../services/api";

type Sale = {
  id: number;
  event_type: string;
  amount: number;
  responsible_id: number | null;
  date: string;
  notes?: string;
};

type Collaborator = {
  id: number;
  name: string;
};

export default function Sales() {

  const [sales, setSales] = useState<Sale[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    fetchCollaborators();
    fetchSales();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch {
      toast.error("Error al cargar colaboradores");
    }
  };

  const fetchSales = async () => {
    try {
      const res = await api.get("/sales");
      setSales(res.data);
    } catch {
      toast.error("Error al cargar ventas");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Sale | null>(null);

  const [eventType, setEventType] = useState("");
  const [amount, setAmount] = useState("");
  const [responsible, setResponsible] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setEventType("");
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

  const openEditModal = (item: Sale) => {
    setEditing(item);
    setEventType(item.event_type);
    setAmount(item.amount.toString());
    setResponsible(item.responsible_id ? item.responsible_id.toString() : "");
    setDate(item.date);
    setNotes(item.notes || "");
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!eventType) return toast.error("El tipo de evento es obligatorio");
    if (!amount) return toast.error("El monto es obligatorio");
    if (!date) return toast.error("Seleccione una fecha");

    const data = {
      event_type: eventType,
      amount: Number(amount),
      responsible_id: responsible ? Number(responsible) : null,
      date,
      notes,
    };

    try {
      if (editing) {
        await api.put(`/sales/${editing.id}`, data);
        toast.success("Venta actualizada");
      } else {
        await api.post("/sales", data);
        toast.success("Venta registrada");
      }

      setOpenModal(false);
      resetForm();
      fetchSales();

    } catch {
      toast.error("Error al guardar venta");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar venta?")) return;

    try {
      await api.delete(`/sales/${id}`);
      toast.success("Eliminado correctamente");
      fetchSales();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const getResponsibleName = (id: number | null) =>
    collaborators.find((c) => c.id === id)?.name ?? "No asignado";

  return (
    <div>
      <h1 className="text-3xl font-bold">Ventas</h1>

      <button
        onClick={openAddModal}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        + Registrar venta
      </button>

      <div className="mt-6">
        <Table
          columns={[
            { label: "Evento", field: "event_type" },
            { label: "Monto", field: "amount" },
            { label: "Responsable", field: "resp" },
            { label: "Fecha", field: "date" },
          ]}
          data={sales.map((s) => ({
            ...s,
            amount: `$${s.amount}`,
            resp: getResponsibleName(s.responsible_id),
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
        title={editing ? "Editar venta" : "Registrar venta"}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4">

          <Select
            label="Tipo de evento"
            value={eventType}
            onChange={setEventType}
            options={[
              { label: "Venta de antojitos", value: "Venta de antojitos" },
              { label: "Venta de comida corrida", value: "Venta de comida corrida" },
              { label: "Venta de tamales", value: "Venta de tamales" },
              { label: "Venta de aguas frescas", value: "Venta de aguas frescas" },
              { label: "Rifas", value: "Rifas" },
              { label: "Otro", value: "Otro" },
            ]}
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

          <Input label="Fecha" value={date} type="date" onChange={setDate} />

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
