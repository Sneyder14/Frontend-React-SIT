import { useState } from "react";
import {
    CalendarDays,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import useStudentData from "../../hooks/useStudentData";

export default function DashboardEstudiante() {
    const [mesActual, setMesActual] = useState("Septiembre 2025");
    const { tareas, loading } = useStudentData();

    const cursos = [
        { course_id: "Matemáticas I" },
        { course_id: "Programación Web" },
        { course_id: "Física Básica" },
    ];

    const tareasRenderizadas = tareas.map((t, index) => ({
        id: `tarea-${t.id || index}`,
        titulo: t.nombre || "Tarea sin título",
        descripcion: t.descripcion || "Sin descripción",
        fecha: t.fecha_entrega || "2025-09-01",
    }));

    return (
        <div className="h-full overflow-y-auto px-6 py-6 animate-fade padding-tablet font-[roboto]">
            <div className="px-6 py-6 animate-fade font-[poppins]">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#665BF7] uppercase flex items-center gap-2 font-[roboto]">
                        <CalendarDays size={24} />
                        Calendario académico
                    </h2>
                    <button className="px-4 py-2 text-sm bg-[#665BF7] text-white rounded-md hover:bg-indigo-700 transition">
                        Nuevo evento
                    </button>
                </div>

                {/* Filtros y búsqueda */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-[roboto]">
                    <select className="px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-[#665BF7] outline-none font-bold font-[roboto]">
                        <option>Próximos 7 días</option>
                        <option>Este mes</option>
                        <option>Todo el semestre</option>
                    </select>

                    <select className="px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-[#665BF7] outline-none font-bold font-[roboto]">
                        <option>Todos los cursos</option>
                        {cursos.map((c) => (
                            <option key={c.course_id}>{c.course_id}</option>
                        ))}
                    </select>

                    <div className="relative font-[roboto]">
                        <input
                            type="text"
                            placeholder="Buscar por tipo o nombre"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full text-sm focus:ring-2 focus:ring-[#665BF7] outline-none"
                        />
                        <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                </div>

                {/* Actividades próximas */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-100 font-[roboto]">
                    <h3 className="text-lg font-[roboto] text-[#665BF7] font-bold mb-4">Actividades próximas</h3>
                    {tareasRenderizadas.length === 0 ? (
                        <p className="text-sm text-gray-600">No hay tareas asignadas.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {tareasRenderizadas.map((tarea) => (
                                <li key={tarea.id} className="py-2 text-sm text-gray-700 flex justify-between items-center font-[roboto]">
                                    <span>
                                        <span className="text-[#101828] font-bold">{formatearFecha(tarea.fecha)}:</span> {tarea.titulo}
                                        <br />
                                        <span className="text-xs text-gray-500">{tarea.descripcion}</span>
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-full font-[roboto] bg-yellow-200 text-yellow-800">
                                        Pendiente
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Calendario mensual */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-[#665BF7] font-bold text-lg">
                            <ChevronLeft size={20} className="cursor-pointer hover:text-indigo-800" />
                            <span>{mesActual}</span>
                            <ChevronRight size={20} className="cursor-pointer hover:text-indigo-800" />
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 text-sm text-gray-700 tablet-flex-col">
                        {tareasRenderizadas.map((tarea) => {
                            const dia = new Date(tarea.fecha).getDate();
                            return (
                                <div
                                    key={tarea.id}
                                    className="bg-indigo-50 hover:bg-indigo-100 transition p-3 rounded-lg shadow-sm border border-indigo-100"
                                >
                                    <p className="font-bold text-[#101828] mb-1">{dia} Sep</p>
                                    <p className="text-xs text-gray-600">{tarea.titulo}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
