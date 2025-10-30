import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

export default function CrudModal({
    visible,
    onClose,
    onSubmit,
    fields,
    initialData = null,
}) {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const idField = initialData
        ? Object.keys(initialData).find((key) => key.toLowerCase().endsWith("_id"))
        : null;

    const isEditing = Boolean(
        initialData &&
        idField &&
        initialData[idField] !== undefined &&
        initialData[idField] !== null &&
        initialData[idField] !== "" &&
        !isNaN(Number(initialData[idField]))
    );

    useEffect(() => {
        const cleanForm = initialData ? { ...initialData } : {};
        if (!isEditing && idField) {
            delete cleanForm[idField];
        }

        setForm(cleanForm);
        setErrors({});
        setSuccess(false);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setForm((prev) => ({ ...prev, [name]: newValue }));

        const updatedErrors = validateField(name, newValue, type);
        setErrors((prev) => ({ ...prev, [name]: updatedErrors[name] || "" }));
    };

    const validateField = (name, value, type) => {
        const error = {};
        if (type === "checkbox") return error;

        const skipMinLength = ["status", "role", "type"].concat(idField || []);
        if ((type === "text" || type === "textarea") && !skipMinLength.includes(name)) {
            const min = type === "text" ? 1 : 5;
            if (!value || value.trim().length < min) {
                error[name] = `Debe tener al menos ${min} caracteres`;
            }
        }

        if (type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error[name] = "Correo inválido";
            }
        }

        if (type === "date") {
            if (!value || isNaN(Date.parse(value))) {
                error[name] = "Fecha inválida";
            }
        }

        if (type === "select") {
            if (!value || value === "") {
                error[name] = "Selecciona una opción";
            }
        }

        return error;
    };

    const validateAll = () => {
        const newErrors = {};
        fields.forEach(({ name, type }) => {
            const value = form[name];
            const fieldErrors = validateField(name, value, type);
            if (fieldErrors[name]) {
                newErrors[name] = fieldErrors[name];
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateAll();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const cleanForm = { ...form };
        const idField = Object.keys(cleanForm).find((key) =>
            key.toLowerCase().endsWith("_id")
        );
        const id = cleanForm[idField];
        const isValidId = id !== undefined && id !== null && id !== "";

        if (!isValidId) {
            delete cleanForm.academic_cut_grade_id;
        }

        onSubmit(cleanForm);

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 1200);
    };

    const isFormValid =
        Object.values(errors).every((err) => err === "") &&
        fields.every(({ name, type }) => {
            if (type === "checkbox") return true;
            const value = form[name];
            return value !== undefined && value !== null && value.toString().trim() !== "";
        });

    if (!visible) return null;

    const useGridLayout = fields.length > 6;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 padding-modal">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade max-h-[90vh] overflow-y-auto font-[roboto]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[roboto]">
                    {isEditing ? "Editar registro" : "Crear nuevo registro"}
                </h2>

                {success && (
                    <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                        <CheckCircle size={18} />
                        Guardado exitosamente
                    </div>
                )}

                <form onSubmit={handleSubmit} className={`${useGridLayout ? "grid grid-cols-2 gap-4" : "space-y-3"}`}>
                    {fields.map(({ name, label, type, options }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">{label}</label>

                            {type === "select" ? (
                                <select
                                    name={name}
                                    value={form[name] ?? ""}
                                    onChange={handleChange}
                                    className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors[name]
                                        ? "border-red-500 ring-red-300"
                                        : "border-gray-300 focus:ring-indigo-500"
                                        }`}
                                >
                                    {(options || ["Activo", "Inactivo"]).map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : type === "textarea" ? (
                                <textarea
                                    name={name}
                                    value={form[name] ?? ""}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`w-full mt-1 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors[name]
                                        ? "border-red-500 ring-red-300"
                                        : "border-gray-300 focus:ring-indigo-500"
                                        }`}
                                />
                            ) : type === "checkbox" ? (
                                <div className="mt-1 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name={name}
                                        checked={form[name] ?? false}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">{label}</span>
                                </div>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={form[name] ?? ""}
                                    onChange={handleChange}
                                    className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors[name]
                                        ? "border-red-500 ring-red-300"
                                        : "border-gray-300 focus:ring-indigo-500"
                                        }`}
                                    required
                                />
                            )}

                            {errors[name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    <div className={`${useGridLayout ? "col-span-2" : ""}`}>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-2 rounded-md transition ${isFormValid
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed font-[roboto]"
                                }`}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
