export default function DetailModal({ visible, item, onClose }) {
    if (!visible || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md font-[roboto]">
                <h3 className="text-lg font-semibold mb-4 text-[#685CFE] uppercase">Detalles del registro</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    {Object.entries(item).map(([key, value]) => (
                        <li key={key}>
                            <strong className="capitalize">{key}:</strong> {String(value)}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
