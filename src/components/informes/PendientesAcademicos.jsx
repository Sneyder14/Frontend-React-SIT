import { useEffect, useState } from "react";
import axios from "axios";
import { FiAlertCircle, FiBook } from "react-icons/fi";

export default function PendientesAcademicos() {
    const [pendientes, setPendientes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://72.61.0.205:8000/api/academics/output-model-predictions/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const data = res.data;

                const filtrados = data
                    .filter((row) => parseFloat(row.n_final_pred) <= 4.0)
                    .map((row) => {
                        const nota = parseFloat(row.n_final_pred);
                        const urgencia = nota <= 2.9 ? "alta" : "media";
                        const accion =
                            nota <= 2.9
                                ? "Agendar tutoría urgente"
                                : "Asignar ejercicios de refuerzo";

                        return {
                            nombre: row.student_name || "Estudiante sin nombre",
                            nota,
                            urgencia,
                            accion,
                        };
                    });

                setPendientes(filtrados);
            })
            .catch(() => {
                console.error("Error al cargar pendientes académicos");
            });
    }, []);

    return (
        <section className="mt-12 h-screen">
            <h2 className="text-2xl font-bold text-[#182130] mb-6 text-center font-monse">
                Pendientes Académicos
            </h2>

            {pendientes.length === 0 ? (
                <p className="text-center text-gray-500 font-inter">
                    No hay estudiantes con desempeño bajo o medio en este momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendientes.map((item, idx) => (
                        <PendienteCard key={idx} {...item} />
                    ))}
                </div>
            )}
        </section>
    );
}

function PendienteCard({ nombre, nota, urgencia, accion }) {
    const colorMap = {
        alta: { text: "text-red-600", bg: "bg-red-100/40", icon: <FiAlertCircle /> },
        media: { text: "text-yellow-600", bg: "bg-yellow-100/40", icon: <FiBook /> },
    };

    const styles = colorMap[urgencia] || colorMap.media;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-200 w-full">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-sm text-gray-500 font-semibold font-monse">{nombre}</h3>
                    <p className="text-xl font-bold text-gray-800 font-inter mt-1">
                        Nota predicha: {nota}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 font-inter">
                        Acción sugerida: <strong>{accion}</strong>
                    </p>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.bg} ${styles.text}`}>
                    {styles.icon}
                </div>
            </div>
        </div>
    );
}
