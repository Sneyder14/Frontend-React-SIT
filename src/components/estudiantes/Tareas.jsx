import { useEffect, useRef } from "react";
import useStudentData from "../../hooks/useStudentData";
import TablaInteractiva from "../estudiantes/TablaInteractiva";


export default function Tareas() {
    const { tareas, loading, error } = useStudentData();

    const columns = [
        { accessorKey: "name", header: "Nombre" },
        { accessorKey: "description", header: "Descripción" },
        {
            accessorKey: "end_date",
            header: "Fecha de entrega",
            cell: (info) => formatearFecha(info.getValue()),
        },
        { accessorKey: "status", header: "Estado" },
        { accessorKey: "percentage", header: "Porcentaje" },
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