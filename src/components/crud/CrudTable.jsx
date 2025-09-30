import { useState, useMemo } from "react";
import CrudModal from "./CrudModal";
import StatusModal from "../StatusModal";
import ConfirmModal from "./ConfirmModal";

export default function CrudTable({
    data,
    columns,
    fields,
    onCreate,
    onUpdate,
    onDelete,
    searchKeys = [],
    dateFilters = [],
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



    const exportData = (format) => {
        let content = "";

        switch (format) {
            case "csv":
                content = [
                    columns.map((col) => col.label).join(","),
                    ...data.map((row) => columns.map((col) => row[col.key]).join(","))
                ].join("\n");
                break;

            case "json":
                content = JSON.stringify(data, null, 2);
                break;

            case "txt":
                content = data.map((row) =>
                    columns.map((col) => `${col.label}: ${row[col.key]}`).join(" | ")
                ).join("\n");
                break;

            case "sql":
                content = data.map((row) => {
                    const keys = columns.map((col) => col.key).join(", ");
                    const values = columns.map((col) => `'${row[col.key]}'`).join(", ");
                    return `INSERT INTO tabla (${keys}) VALUES (${values});`;
                }).join("\n");
                break;
        }

        console.log(`Exportado como ${format}:\n`, content);
        setExportOpen(false);
    };

    return (
        <section className="py-6 px-2">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#101828]"
                />
                {filteredData.length > 0 && (
                    <div className="text-sm text-gray-600">
                        Mostrando {filteredData.length} resultado{filteredData.length > 1 ? "s" : ""}
                    </div>
                )}

                <div className="relative flex text-left gap-3">
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
                        className="bg-[#101828] text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Crear nuevo
                    </button>


                    <button
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
                        onClick={() => setExportOpen(!exportOpen)}
                    >
                        Exportar como ▾
                    </button>

                    {exportOpen && (
                        <div className="absolute right-0 mt-11 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1 text-sm text-gray-700">
                                <li onClick={() => exportData("csv")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📄 Exportar CSV</li>
                                <li onClick={() => exportData("json")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🧾 Exportar JSON</li>
                                <li onClick={() => exportData("txt")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📃 Exportar TXT</li>
                                <li onClick={() => exportData("sql")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🗃️ Exportar SQL</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            {columns.map(({ key, label }) => (
                                <th
                                    key={key}
                                    onClick={() => toggleSort(key)}
                                    className="px-4 py-3 text-left text-sm font-semibold text-[#101828] cursor-pointer select-none"
                                >
                                    <span className="flex items-center">
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
                            <th className="px-4 py-3 text-left text-sm font-semibold text-[#101828]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {columns.map(({ key }) => (
                                    <td key={key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                        {item[key]}
                                    </td>
                                ))}
                                <td className="flex gap-2 justify-end px-4 py-3">
                                    <button
                                        onClick={() => {
                                            setCreating(false);
                                            setEditingData(item);
                                            setModalVisible(true);
                                        }}
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            const idField = Object.keys(item).find((key) =>
                                                key.toLowerCase().endsWith("_id")
                                            );
                                            setPendingDeleteId(item[idField]);
                                            setConfirmVisible(true);
                                        }}
                                        className="text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <CrudModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                fields={fields}
                initialData={editingData}
            />
            {confirmVisible && (
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

        </section>
    );
}
