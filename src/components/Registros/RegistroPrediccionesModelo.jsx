import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";

export default function RegistroPrediccionesModelo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const [predRes, courseRes, userRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/academics/output-model-predictions/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/course-students/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/auth/users/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const predicciones = predRes.data;
                const relaciones = courseRes.data;
                const usuarios = userRes.data;

                const enriched = predicciones.map((row) => {
                    const nota = parseFloat(row.n_final_pred);
                    let etiqueta = "";
                    if (nota >= 0.0 && nota <= 2.9) etiqueta = "Bajo";
                    else if (nota >= 3.0 && nota <= 4.0) etiqueta = "Medio";
                    else if (nota >= 4.1 && nota <= 5.0) etiqueta = "Alto";

                    const relacion = relaciones.find(
                        r => r.course_student_id === row.course_student_id
                    );
                    const studentId = relacion?.student_id;

                    const usuario = usuarios.find(
                        u => Number(u.id_user) === Number(studentId)
                    );

                    if (!usuario) {
                        console.warn("⚠️ Usuario no encontrado para student_id:", studentId);
                    }

                    return {
                        ...row,
                        etiqueta_desempeno: etiqueta,
                        nombre_estudiante: usuario
                            ? `${usuario.name ?? "Sin nombre"} ${usuario.last_name ?? ""}`
                            : `ID estudiante: ${studentId ?? "desconocido"}`,
                    };
                });

                const filtered = enriched.filter(row =>
                    ["Bajo", "Medio"].includes(row.etiqueta_desempeno)
                );

                setData(filtered);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar las predicciones del modelo");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { key: "output_model_prediction_id", label: "ID Predicción" },
        { key: "nombre_estudiante", label: "Estudiante" },
        { key: "course_student_id", label: "ID Estudiante-Curso" },
        { key: "academic_cut_id", label: "ID Corte Académico" },
        { key: "n_final_pred", label: "Nota Final Predicha" },
        { key: "model_version", label: "Versión del Modelo" },
        { key: "status", label: "Estado" },
        { key: "etiqueta_desempeno", label: "Desempeño" },
    ];

    const getDesempenoClass = (etiqueta) => {
        switch (etiqueta) {
            case "Bajo":
                return "bg-red-100 text-red-700";
            case "Medio":
                return "bg-yellow-100 text-yellow-700";
            case "Alto":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const renderCell = (key, value) => {
        if (key === "etiqueta_desempeno") {
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDesempenoClass(value)}`}>
                    {value}
                </span>
            );
        }

        if (key === "status") {
            const statusClass = {
                active: "bg-green-100 text-green-700",
                a: "bg-green-100 text-green-700",
                i: "bg-red-100 text-red-700",
                scheduled: "bg-green-100 text-green-700",
                complete: "bg-green-100 text-green-700",
                closed: "bg-gray-100 text-gray-600",
            };

            const normalized = String(value).toLowerCase();
            const color = statusClass[normalized] || "bg-blue-100 text-blue-700";

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                    {value}
                </span>
            );
        }

        return value;
    };

    return (
        <CrudTable
            title="Predicciones del Modelo"
            data={data}
            columns={columns}
            loading={loading}
            actions={[]}
            readOnly={true}
            error={error}
            renderCell={renderCell}
            searchKeys={["output_model_prediction_id", "nombre_estudiante"]}
        />
    );
}
