import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GraficoDesempeno({ resumen }) {
    const data = {
        labels: ["Bajo", "Medio", "Alto"],
        datasets: [
            {
                label: "Cantidad de estudiantes",
                data: [resumen.bajo, resumen.medio, resumen.alto],
                backgroundColor: ["#EF4444", "#FACC15", "#22C55E"],
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 h-[300px] sm:h-[400px] lg:h-[500px]">
            <h3 className="text-lg font-bold text-[#182130] mb-4 font-monse">
                Distribución de Desempeño Predicho
            </h3>
            <div className="relative w-full h-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
