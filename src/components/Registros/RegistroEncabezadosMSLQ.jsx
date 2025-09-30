import useEncabezadoMSLQ from "../../hooks/useEncabezadoMSLQ";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "item_header_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroEncabezadosMSLQ() {
    const {
        encabezados,
        createEncabezado,
        updateEncabezado,
        deleteEncabezado,
        loading,
    } = useEncabezadoMSLQ();

    return (
        <CrudTable
            title="Encabezados MSLQ"
            data={encabezados}
            columns={columns}
            fields={fields}
            onCreate={createEncabezado}
            onUpdate={updateEncabezado}
            onDelete={deleteEncabezado}
            searchKeys={["item_header_id", "name", "status"]}
        />
    );
}
