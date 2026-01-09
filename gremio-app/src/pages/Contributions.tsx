import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import api from "../services/api";

type Contribution = {
  id: number;
  collaborator_id: number;
  amount: number;
  type: string;
  date: string;
};

type Collaborator = {
  id: number;
  name: string;
};

export default function Contributions() {

  // APORTACIONES
  const [contributions, setContributions] = useState<Contribution[]>([]);

  // COLABORADORES REALES
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchCollaborators();
    fetchContributions();
  }, []);

  // GET colaboradores reales
  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch (error) {
      toast.error("Error al cargar colaboradores");
    }
  };

  // GET aportaciones reales
  const fetchContributions = async () => {
    try {
      const res = await api.get("/contributions");
      setContributions(res.data);
    } catch (error) {
      toast.error("Error al cargar aportaciones");
    }
  };

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Contribution | null>(null);

  // Campos del formulario
  const [collabID, setCollabID] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setCollabID("");
    setAmount("");
    setType("");
    setDate("");
    setEditing(null);
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item: Contribution) => {
    setEditing(item);
    setCollabID(item.collaborator_id.toString());
    setAmount(item.amount.toString());
    setType(item.type);
    setDate(item.date);
    setOpenModal(true);
  };

  // GUARDAR (POST / PUT)
  const handleSave = async () => {
    if (!collabID) return toast.error("Seleccione un colaborador");
    if (!amount) return toast.error("Ingrese el monto");
    if (!type) return toast.error("Seleccione un tipo");
    if (!date) return toast.error("Seleccione una fecha");

    const data = {
      collaborator_id: Number(collabID),
      amount: Number(amount),
      type,
      date,
    };

    try {
      if (editing) {
        await api.put(`/contributions/${editing.id}`, data);
        toast.success("Aportación actualizada");
      } else {
        await api.post("/contributions", data);
        toast.success("Aportación registrada");
      }

      setOpenModal(false);
      resetForm();
      fetchContributions(); // refrescar BD

    } catch (error) {
      toast.error("Error al guardar aportación");
    }
  };

  // DELETE real
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar aportación?")) return;

    try {
      await api.delete(`/contributions/${id}`);
      toast.success("Eliminado correctamente");
      fetchContributions();

    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  // Obtener nombre del colaborador
  const getCollaboratorName = (id: number) => {
    return collaborators.find((c) => c.id === id)?.name || "Desconocido";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Aportaciones</h1>

      <button
        onClick={openAddModal}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Registrar aportación
      </button>

      <div className="mt-6">
        <Table
          columns={[
            { label: "Colaborador", field: "name" },
            { label: "Monto", field: "amount" },
            { label: "Tipo", field: "type" },
            { label: "Fecha", field: "date" },
          ]}
          data={contributions.map((c) => ({
            ...c,
            name: getCollaboratorName(c.collaborator_id),
            amount: `$${c.amount}`,
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

      {/* Modal */}
      <Modal
        open={openModal}
        title={editing ? "Editar aportación" : "Registrar aportación"}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4">

          <Select
            label="Colaborador"
            value={collabID}
            onChange={setCollabID}
            options={collaborators.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
          />

          <Input
            label="Monto"
            value={amount}
            type="number"
            onChange={setAmount}
            placeholder="Ingresa el monto"
          />

          <Select
            label="Tipo de aportación"
            value={type}
            onChange={setType}
            options={[
              { label: "Obligatoria", value: "obligatoria" },
              { label: "Adicional", value: "adicional" },
              { label: "Venta de comida", value: "venta" },
              { label: "Otro", value: "otro" },
            ]}
          />

          <Input
            label="Fecha"
            value={date}
            type="date"
            onChange={setDate}
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Guardar
          </button>

        </div>
      </Modal>

    </div>
  );
}
