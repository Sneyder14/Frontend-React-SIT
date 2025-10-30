import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingDown, FiTrendingUp, FiPieChart } from "react-icons/fi";
import GraficoDesempeno from '../informes/GraficoDesempeno';


export default function InformePredicciones() {
    const [resumen, setResumen] = useState({
        bajo: 0,
        medio: 0,
        alto: 0,
        total: 0,
        promedio: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://72.61.0.205:8000/api/academics/output-model-predictions/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const data = res.data;
                let bajo = 0,
                    medio = 0,
                    alto = 0,
                    suma = 0;

                data.forEach((row) => {
                    const nota = parseFloat(row.n_final_pred);
                    suma += nota;

                    if (nota <= 2.9) bajo++;
                    else if (nota <= 4.0) medio++;
                    else alto++;
                });

                const total = data.length;
                const promedio = total > 0 ? (suma / total).toFixed(2) : 0;

                setResumen({ bajo, medio, alto, total, promedio });
            })
            .catch(() => {
                console.error("Error al cargar informe de predicciones");
            });
    }, []);

    const cards = [
        {
            label: "Bajo desempeño",
            value: resumen.bajo,
            icon: <FiTrendingDown />,
            color: "red",
        },
        {
            label: "Medio desempeño",
            value: resumen.medio,
            icon: <FiPieChart />,
            color: "yellow",
        },
        {
            label: "Alto desempeño",
            value: resumen.alto,
            icon: <FiTrendingUp />,
            color: "green",
        },
        {
            label: "Promedio general",
            value: resumen.promedio,
            icon: <FiPieChart />,
            color: "blue",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-50 p-6">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-[#182130] font-monse">
                    Informe de Predicciones Académicas
                </h2>
                <p className="text-sm text-gray-500 mt-1 font-inter">
                    Análisis estadístico basado en el modelo predictivo
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, idx) => (
                    <ResumenCard key={idx} {...card} />
                ))}
            </div>

            <div className="text-center text-sm text-gray-600 font-inter mb-4">
                Total de predicciones analizadas: <strong>{resumen.total}</strong>
            </div>
            <GraficoDesempeno resumen={resumen} />
        </div>
    );
}

function ResumenCard({ label, value, icon, color }) {
    const colorMap = {
        red: { text: "text-red-600", bg: "bg-red-100/40" },
        yellow: { text: "text-yellow-600", bg: "bg-yellow-100/40" },
        green: { text: "text-green-600", bg: "bg-green-100/40" },
        blue: { text: "text-blue-600", bg: "bg-blue-100/40" },
    };

    const styles = colorMap[color] || colorMap.blue;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-200 w-full">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-sm text-gray-500 font-semibold font-monse">{label}</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-800 font-inter mt-1">{value}</p>
                </div>
                <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.bg} ${styles.text}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}
