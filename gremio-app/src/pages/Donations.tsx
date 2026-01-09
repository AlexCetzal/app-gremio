import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import api from "../services/api";

type Donation = {
  id: number;
  collaborator_id: number | null;
  product: string;
  quantity: number;
  unit: string;
  estimated_value: number;
  date: string;
};

type Collaborator = {
  id: number;
  name: string;
};

export default function Donations() {

  const [donations, setDonations] = useState<Donation[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    fetchCollaborators();
    fetchDonations();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch {
      toast.error("Error al cargar colaboradores");
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donations");
      setDonations(res.data);
    } catch {
      toast.error("Error al cargar donaciones");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Donation | null>(null);

  const [collabID, setCollabID] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setCollabID("");
    setProduct("");
    setQuantity("");
    setUnit("");
    setValue("");
    setDate("");
    setEditing(null);
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item: Donation) => {
    setEditing(item);
    setCollabID(item.collaborator_id ? item.collaborator_id.toString() : "");
    setProduct(item.product);
    setQuantity(item.quantity.toString());
    setUnit(item.unit);
    setValue(item.estimated_value.toString());
    setDate(item.date);
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!product.trim()) return toast.error("El producto es obligatorio");
    if (!quantity) return toast.error("La cantidad es obligatoria");
    if (!unit) return toast.error("La unidad es obligatoria");
    if (!date) return toast.error("Seleccione una fecha");

    const data = {
      collaborator_id: collabID ? Number(collabID) : null,
      product,
      quantity: Number(quantity),
      unit,
      estimated_value: value ? Number(value) : 0,
      date,
    };

    try {
      if (editing) {
        await api.put(`/donations/${editing.id}`, data);
        toast.success("Donación actualizada");
      } else {
        await api.post("/donations", data);
        toast.success("Donación agregada");
      }

      setOpenModal(false);
      resetForm();
      fetchDonations();

    } catch {
      toast.error("Error al guardar donación");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar donación?")) return;

    try {
      await api.delete(`/donations/${id}`);
      toast.success("Eliminado correctamente");
      fetchDonations();
    } catch {
      toast.error("Error al eliminar donación");
    }
  };

  const getCollaboratorName = (id: number | null) =>
    collaborators.find((c) => c.id === id)?.name ?? "Donador externo";

  return (
    <div>
      <h1 className="text-3xl font-bold">Donaciones</h1>

      <button
        onClick={openAddModal}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        + Registrar donación
      </button>

      <div className="mt-6">
        <Table
          columns={[
            { label: "Donador", field: "donor" },
            { label: "Producto", field: "product" },
            { label: "Cantidad", field: "quantity" },
            { label: "Valor", field: "value" },
            { label: "Fecha", field: "date" },
          ]}
          data={donations.map((d) => ({
            donor: getCollaboratorName(d.collaborator_id),
            product: d.product,
            quantity: `${d.quantity} ${d.unit}`,
            value: `$${d.estimated_value}`,
            date: d.date,
            id: d.id
          }))}
          actions={(row) => (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded-md"
                onClick={() => {
                  const donation = donations.find((d) => d.id === row.id);
                  donation && openEditModal(donation);
                }}
              >
                Editar
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white rounded-md"
                onClick={() => handleDelete(row.id)}
              >
                Eliminar
              </button>
            </div>
          )}
        />
      </div>

      <Modal
        open={openModal}
        title={editing ? "Editar donación" : "Registrar donación"}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4">

          <Select
            label="Colaborador (opcional)"
            value={collabID}
            onChange={setCollabID}
            options={[
              { label: "Donador externo", value: "" },
              ...collaborators.map((c) => ({ label: c.name, value: c.id })),
            ]}
          />

          <Input label="Producto" value={product} onChange={setProduct} />
          <Input label="Cantidad" value={quantity} onChange={setQuantity} type="number" />

          <Select
            label="Unidad"
            value={unit}
            onChange={setUnit}
            options={[
              { label: "kg", value: "kg" },
              { label: "L", value: "L" },
              { label: "Piezas", value: "piezas" },
              { label: "Bolsas", value: "bolsas" },
            ]}
          />

          <Input
            label="Valor estimado"
            value={value}
            type="number"
            onChange={setValue}
          />

          <Input label="Fecha" value={date} type="date" onChange={setDate} />

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
