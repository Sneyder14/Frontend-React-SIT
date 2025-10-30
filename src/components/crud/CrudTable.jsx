import { useState, useMemo } from "react";
import CrudModal from "./CrudModal";
import StatusModal from "../StatusModal";
import ConfirmModal from "./ConfirmModal";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


export default function CrudTable({
    data,
    columns,
    fields,
    onCreate,
    onUpdate,
    onDelete,
    searchKeys = [],
    dateFilters = [],
    readOnly = false,
    renderCell,
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [searchTerm, setSearchTerm] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [startFilter, setStartFilter] = useState("");
    const [endFilter, setEndFilter] = useState("");
    const [creating, setCreating] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState("success");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    //manejo De Estados

    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const truncateFields = ["description", "notes"];
    const truncateText = (text, maxLength = 60) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
            case "a":
                return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
            case "i":
                return "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold";
            case "scheduled":
                return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
            case "complete":
                return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold";
            case "closed":
                return "bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold";
            default:
                return "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold";
        }
    };





    const filteredData = useMemo(() => {
        let result = [...data];

        if (searchTerm.trim()) {
            result = result.filter((item) =>
                searchKeys.some((key) =>
                    String(item[key] ?? "").toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (startFilter && endFilter && dateFilters.length > 0) {
            result = result.filter((item) =>
                dateFilters.some((key) => {
                    const date = new Date(item[key]);
                    return date >= new Date(startFilter) && date <= new Date(endFilter);
                })
            );
        }

        return result;
    }, [data, searchTerm, startFilter, endFilter, searchKeys, dateFilters]);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key] ?? "";
            const bVal = b[sortConfig.key] ?? "";
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    const toggleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSubmit = async (formData) => {
        try {
            if (creating) {
                const cleanData = { ...formData };
                delete cleanData.academic_cut_grade_id;

                await onCreate(cleanData);
                setFeedbackType("success");
                setFeedbackMessage("Registro creado exitosamente");
            } else {
                const idField = Object.keys(formData).find((key) =>
                    key.toLowerCase().endsWith("_id")
                );
                const id = formData[idField];
                const isValidId = id !== undefined && id !== null && id !== "";

                if (idField && isValidId) {
                    await onUpdate(id, formData);
                    setFeedbackType("success");
                    setFeedbackMessage("Registro actualizado correctamente");
                } else {
                    setFeedbackType("warning");
                    setFeedbackMessage("ID inválido para actualizar");
                }

                if (formData.start_date > formData.end_date) {
                    setFeedbackType("warning");
                    setFeedbackMessage("La fecha de inicio no puede ser posterior a la fecha de fin");
                    setFeedbackVisible(true);
                    return;
                }
            }
        } catch (err) {
            const errorData = err.response?.data;

            if (err.response?.status === 404) {
                setFeedbackType("error");
                setFeedbackMessage(" El ID no existe en la base de datos");
            } else if (err.response?.status === 400) {
                if (errorData?.semester_id?.[0]?.includes("no existe")) {
                    setFeedbackMessage(" El semestre seleccionado no existe");
                } else if (errorData?.teacher_id?.[0]?.includes("no existe")) {
                    setFeedbackMessage(" El profesor seleccionado no existe");
                } else if (errorData?.course_id?.[0]?.includes("ya existe")) {
                    setFeedbackMessage(" Ya existe un curso con ese ID");
                } else {
                    setFeedbackMessage(" Datos inválidos o campos incompletos");
                }
                setFeedbackType("error");
            } else {
                setFeedbackType("error");
                setFeedbackMessage(" Error inesperado al guardar");
            }
        } finally {
            setModalVisible(false);
            setCreating(false);
            setFeedbackVisible(true);
        }
    };


    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            setFeedbackType("success");
            setFeedbackMessage("Registro eliminado correctamente");
        } catch (err) {
            if (err.response?.status === 400 || err.response?.status === 409) {
                setFeedbackType("error");
                setFeedbackMessage("No se puede eliminar: el registro está relacionado");
            } else {
                setFeedbackType("error");
                setFeedbackMessage("Error inesperado al eliminar");
            }
        } finally {
            setConfirmVisible(false);
            setFeedbackVisible(true);
        }
    };


    return (
        <section className="py-2">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 font-[roboto]">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-[400px] sm:w-64 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#685CFE] font-[roboto]"
                />
                {filteredData.length > 0 && (
                    <div className="text-sm text-gray-900 font-[roboto] font-semibold text-center">
                        Mostrando {filteredData.length} resultado{filteredData.length > 1 ? "s" : ""}
                    </div>
                )}
                {!readOnly && (
                    <div className="relative flex text-left gap-2">
                        <button
                            onClick={() => {
                                const emptyData = {};
                                fields.forEach((field) => {
                                    emptyData[field.name] = "";
                                });
                                setCreating(true);
                                setEditingData(emptyData);
                                setModalVisible(true);
                            }}
                            className="bg-[#685CFE] text-white px-4 py-2 rounded-md hover:bg-green-700 hover:text-white font-[roboto] uppercase"
                        >
                            Crear nuevo
                        </button>
                    </div>
                )}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
                <table className="min-w-full divide-y divide-gray-300 font-[roboto]">
                    <thead className="bg-gray-200 text-center">
                        <tr>
                            {columns.map(({ key, label }) => (
                                <th
                                    key={key}
                                    onClick={() => toggleSort(key)}
                                    className="px-4 py-3 text-center text-sm font-semibold text-[#685CFE] cursor-pointer select-none font-[roboto]"
                                >
                                    <span className="flex items-center justify-center gap-1">
                                        {label}
                                        <svg
                                            className={`w-4 h-4 ml-1 transition-transform ${sortConfig.key === key
                                                    ? sortConfig.direction === "asc"
                                                        ? "rotate-180"
                                                        : ""
                                                    : "opacity-30"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                            />
                                        </svg>
                                    </span>
                                </th>
                            ))}
                            {!readOnly && (
                                <th className="px-4 py-3 text-sm font-semibold text-[#685CFE] font-[roboto]">
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map((item, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 cursor-pointer font-[roboto]"
                                onClick={() => {
                                    setSelectedItem(item);
                                    setDetailModalVisible(true);
                                }}
                            >
                                {columns.map(({ key }) => (
                                    <td
  key={key}
  className="px-4 py-3 max-w-[200px] truncate whitespace-nowrap text-sm text-gray-800 text-center font-[roboto]"
>
  {renderCell
    ? renderCell(key, item[key])
    : truncateFields.includes(key) ? (
        <span className="text-indigo-600 hover:underline">
          {truncateText(item[key] ?? "")}
        </span>
      ) : ["status", "estado_participacion", "participation_status"].includes(key) ||
        ["active", "complete", "inactive"].includes(String(item[key]).toLowerCase()) ? (
        <span className={getStatusClass(item[key])}>{item[key]}</span>
      ) : (
        item[key]
      )}
</td>

                                ))}
                                {!readOnly && (
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCreating(false);
                                                    setEditingData(item);
                                                    setModalVisible(true);
                                                }}
                                                title="Editar"
                                                className="hover:text-indigo-700 transition"
                                            >
                                                <CreateIcon fontSize="medium" style={{ color: "#4F46E5" }} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const idField = Object.keys(item).find((key) =>
                                                        key.toLowerCase().endsWith("_id")
                                                    );
                                                    setPendingDeleteId(item[idField]);
                                                    setConfirmVisible(true);
                                                }}
                                                title="Eliminar"
                                                className="hover:text-red-700 transition"
                                            >
                                                <DeleteIcon fontSize="medium" style={{ color: "#DC2626" }} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modales */}
            {!readOnly && (
                <CrudModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleSubmit}
                    fields={fields}
                    initialData={editingData}
                />
            )}
            {!readOnly && confirmVisible && (
                <ConfirmModal
                    visible={confirmVisible}
                    message="Este registro será eliminado permanentemente. ¿Deseas continuar?"
                    onCancel={() => setConfirmVisible(false)}
                    onConfirm={() => handleDelete(pendingDeleteId)}
                />
            )}
            {feedbackVisible && (
                <StatusModal
                    type={feedbackType}
                    message={feedbackMessage}
                    visible={feedbackVisible}
                    onClose={() => setFeedbackVisible(false)}
                />
            )}
            {detailModalVisible && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto border border-gray-200">
                        <h3 className="text-xl font-bold text-[#111827] mb-5 text-center">Detalles del registro</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
                            {columns.map(({ key, label }) => (
                                <div key={key} className="flex flex-col">
                                    <span className="font-bold text-[#111827]">{label}</span>
                                    <span className="mt-1 text-gray-800 break-words">{String(selectedItem[key] ?? "")}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => setDetailModalVisible(false)}
                                className="px-5 py-2 bg-[#182130] text-white rounded-md hover:bg-[#685CFE] transition font-medium"
                            >
                                CERRAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
