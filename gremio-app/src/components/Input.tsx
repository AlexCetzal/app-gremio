type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
};

export default function Input({ label, value, onChange, type = "text", placeholder }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
