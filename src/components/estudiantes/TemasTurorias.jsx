
import useSupportTopics from "../../hooks/useSupportTopics";
import TablaInteractiva from "./TablaInteractiva";

export default function TemasTutorias() {
    const { temas, loading, error } = useSupportTopics();

    const columns = [
        { accessorKey: "topic", header: "Tema" },
        { accessorKey: "description", header: "Descripción" },
        { accessorKey: "status", header: "Estado" },
    ];

    if (loading) return <div className="p-6 text-gray-500">Cargando temas de apoyo...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return <TablaInteractiva columns={columns} data={temas} titulo="Temas de Tutoría" />;
}
