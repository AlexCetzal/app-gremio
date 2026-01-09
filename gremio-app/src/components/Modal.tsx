type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ open, title, children, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">×</button>
        </div>

        {children}
      </div>
    </div>
  );
}
