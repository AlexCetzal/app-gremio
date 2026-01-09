type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (value: string) => void;
};

export default function Select({ label, value, options, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una opción</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
