import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import toast from "react-hot-toast";
import api from "../services/api";




type Collaborator = {
  id: number;
  name: string;
  phone: string;
  notes?: string;
};



export default function Collaborators() {
  
  // Datos iniciales de prueba
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
  fetchCollaborators();
}, []);

const fetchCollaborators = async () => {
  const res = await api.get("/collaborators");
  setCollaborators(res.data);
};



  // Control del modal
  const [openModal, setOpenModal] = useState(false);

  // Modo edición
  const [editing, setEditing] = useState<Collaborator | null>(null);

  // Campos del formulario
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setPhone("");
    setNotes("");
    setEditing(null);
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (collab: Collaborator) => {
    setEditing(collab);
    setName(collab.name);
    setPhone(collab.phone);
    setNotes(collab.notes || "");
    setOpenModal(true);
  };
  

  const handleSave = async () => {
  if (!name.trim()) return toast.error("El nombre es obligatorio");

  const data = {
    name,
    phone,
    notes,
  };

  // EDITAR
  if (editing) {
    await api.put(`/collaborators/${editing.id}`, data);
    toast.success("Colaborador actualizado");
  } else {
    await api.post("/collaborators", data);
    toast.success("Colaborador agregado");
  }

  setOpenModal(false);
  resetForm();
  fetchCollaborators();
};


  const handleDelete = async (id: number) => {
  if (!confirm("¿Eliminar colaborador?")) return;

  await api.delete(`/collaborators/${id}`);

  toast.success("Eliminado correctamente");
  fetchCollaborators();
};


  return (
    <div>
      <h1 className="text-3xl font-bold">Colaboradores</h1>

      <button
        onClick={openAddModal}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Agregar colaborador
      </button>

      {/* Tabla */}
      <div className="mt-6">
        <Table
          columns={[
            { label: "Nombre", field: "name" },
            { label: "Teléfono", field: "phone" },
            { label: "Notas", field: "notes" },
          ]}
          data={collaborators}
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

      {/* Modal para agregar/editar */}
      <Modal
        open={openModal}
        title={editing ? "Editar colaborador" : "Agregar colaborador"}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4">

          <Input
            label="Nombre"
            value={name}
            onChange={setName}
            placeholder="Nombre completo"
          />

          <Input
            label="Teléfono"
            value={phone}
            onChange={setPhone}
            placeholder="Número de contacto"
          />

          <Input
            label="Notas"
            value={notes}
            onChange={setNotes}
            placeholder="Notas opcionales"
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
