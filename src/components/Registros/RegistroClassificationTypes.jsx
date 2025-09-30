import useClasificaciones from "../../hooks/useCalificaciones";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "type_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "category", label: "Categoría" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "category", label: "Categoría", type: "text" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroClassificationTypes() {
    const {
        clasificaciones,
        createClasificacion,
        updateClasificacion,
        deleteClasificacion,
        loading,
    } = useClasificaciones();

    return (
        <CrudTable
            title="Tipos de Clasificación"
            data={clasificaciones}
            columns={columns}
            fields={fields}
            onCreate={createClasificacion}
            onUpdate={updateClasificacion}
            onDelete={deleteClasificacion}
            searchKeys={["type_id", "name", "category", "status"]}
        />
    );
}
