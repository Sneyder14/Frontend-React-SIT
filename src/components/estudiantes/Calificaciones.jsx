import useStudentData from "../../hooks/useStudentData";
import TablaInteractiva from "./TablaInteractiva";
export default function Calificaciones() {
    const { calificaciones, loading, error } = useStudentData();

    const columns = [
        {
            accessorKey: "delivery_time",
            header: "Fecha de entrega",
            cell: (info) => formatearFecha(info.getValue()),
        },
        { accessorKey: "results", header: "Resultado" },
        { accessorKey: "grade", header: "Nota" },
        { accessorKey: "status", header: "Estado" },
    ];

    if (loading) return <div className="p-6 text-gray-800">Cargando calificaciones...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return <TablaInteractiva columns={columns} data={calificaciones} titulo="Calificaciones" />;
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
