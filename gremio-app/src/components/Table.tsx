type Column = {
  label: string;
  field: string;
};

type Props = {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
};

export default function Table({ columns, data, actions }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            {columns.map((col) => (
              <th key={col.field} className="p-3 text-left">{col.label}</th>
            ))}
            {actions && <th className="p-3">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.field} className="p-3">{row[col.field]}</td>
              ))}
              
              {actions && (
                <td className="p-3">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
