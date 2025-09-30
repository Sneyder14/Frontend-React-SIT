import { useState } from "react";
import {
    CalendarDays,
    Search,
    ChevronLeft,
    ChevronRight,
    NotebookPen,
    ClipboardList,
    BookOpen,
} from "lucide-react";

export default function DashboardEstudiante() {
    const [mesActual, setMesActual] = useState("Septiembre 2025");

    const cursos = [
        { course_id: "Matemáticas I" },
        { course_id: "Programación Web" },
        { course_id: "Física Básica" },
    ];

    const actividades = [
        { id: 1, titulo: "Vencimiento de tarea", fecha: "2025-09-01" },
        { id: 2, titulo: "Se abre Autoevaluación", fecha: "2025-09-02" },
        { id: 3, titulo: "Foro: VLAN", fecha: "2025-09-03" },
        { id: 4, titulo: "Se abre primer ejercicio", fecha: "2025-09-04" },
        { id: 5, titulo: "Se cierra primer ejercicio", fecha: "2025-09-06" },
        { id: 6, titulo: "Vencimiento de entrega", fecha: "2025-09-07" },
    ];

    return (
        <div className="h-full overflow-y-auto px-6 py-6 animate-fade padding-tablet font-[poppins]">
            <div className="px-6 py-6 animate-fade font-[poppins]">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#101828] uppercase flex items-center gap-2">
                        <CalendarDays size={24} />
                        Calendario académico
                    </h2>
                    <button className="px-4 py-2 text-sm bg-[#101828] text-white rounded-md hover:bg-indigo-700 transition">
                        Nuevo evento
                    </button>
                </div>

                {/* Filtros y búsqueda */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <select className="px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-[#101828] outline-none font-bold">
                        <option>Próximos 7 días</option>
                        <option>Este mes</option>
                        <option>Todo el semestre</option>
                    </select>

                    <select className="px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-[#101828] outline-none font-bold">
                        <option>Todos los cursos</option>
                        {cursos.map((c) => (
                            <option key={c.course_id}>{c.course_id}</option>
                        ))}
                    </select>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por tipo o nombre"
                            className="px-4 py-2 border border-gray-300 rounded-md w-full text-sm focus:ring-2 focus:ring-[#101828] outline-none"
                        />
                        <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                </div>

                {/* Actividades próximas */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-100 ">
                    <h3 className="text-lg  text-[#101828] font-bold mb-4">Actividades próximas</h3>
                    {actividades.length === 0 ? (
                        <p className="text-sm text-gray-600">No hay actividades que requieran acción.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {actividades.map((act) => (
                                <li key={act.id} className="py-2 text-sm text-gray-700 flex justify-between items-center">
                                    <span>
                                        <span className=" text-[#101828] font-bold">{formatearFecha(act.fecha)}:</span> {act.titulo}
                                    </span>
                                    <span className="text-xs bg-indigo-200 text-[#101828] px-2 py-1 rounded-full">Pendiente</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Calendario mensual */}
                <div className=" bg-white rounded-xl shadow-md p-4 border border-gray-100 ">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-[#101828] font-bold text-lg">
                            <ChevronLeft size={20} className="cursor-pointer hover:text-indigo-800" />
                            <span>{mesActual}</span>
                            <ChevronRight size={20} className="cursor-pointer hover:text-indigo-800" />
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 text-sm text-gray-700 tablet-flex-col">
                        {actividades.map((act) => {
                            const dia = new Date(act.fecha).getDate();
                            return (
                                <div
                                    key={act.id}
                                    className="bg-indigo-50 hover:bg-indigo-100 transition p-3 rounded-lg shadow-sm border border-indigo-100"
                                >
                                    <p className="font-bold text-[#101828] mb-1">{dia} Sep</p>
                                    <p className="text-xs text-gray-600">{act.titulo}</p>
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
