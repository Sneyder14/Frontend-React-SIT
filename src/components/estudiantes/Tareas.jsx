import { useEffect, useRef } from "react";
import useStudentTasks from "../../hooks/useStudentTasks";
import TablaInteractiva from "../estudiantes/TablaInteractiva";

export default function Tareas() {
    const { tareas, loading, error } = useStudentTasks();

    const columns = [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: (info) => (
                <span className="font-semibold text-gray-800">{info.getValue()}</span>
            ),
        },
        {
            accessorKey: "description",
            header: "Descripción",
            cell: (info) => {
                const value = info.getValue();
                return (
                    <span title={value} className="text-gray-600">
                        {value.length > 50 ? value.slice(0, 50) + "..." : value}
                    </span>
                );
            },
        },
        {
            accessorKey: "end_date",
            header: "Fecha de entrega",
            cell: (info) => (
                <span className="text-gray-700">{formatearFecha(info.getValue())}</span>
            ),
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: (info) => {
                const estado = info.getValue();
                const color =
                    estado === "completado"
                        ? "bg-green-100 text-green-700"
                        : estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700";
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                        {estado}
                    </span>
                );
            },
        },
        {
            accessorKey: "percentage",
            header: "Porcentaje",
            cell: (info) => (
                <span className="text-indigo-600 font-bold">{info.getValue()}</span>
            ),
        },
    ];

    if (loading) return <div className="p-6 text-gray-500">Cargando tareas...</div>;
    if (error) return <div className="p-6 text-red-500 font-[roboto]">{error}</div>;

    return <TablaInteractiva columns={columns} data={tareas} titulo="Tareas asignadas" />;
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
