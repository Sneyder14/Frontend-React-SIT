export default function ConfirmModal({ visible, message, onConfirm, onCancel }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Estás seguro?</h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
