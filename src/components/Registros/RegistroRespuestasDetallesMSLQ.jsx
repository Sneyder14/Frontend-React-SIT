import useRespuestasMSLQ from "../../hooks/useRespuestaDetallesMSLQ";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "item_response_detail_id", label: "ID" },
    { key: "mslq_response_id", label: "Respuesta MSLQ" },
    { key: "mslq_item_id", label: "Ítem MSLQ" },
    { key: "response_date", label: "Fecha de respuesta" },
    { key: "score", label: "Puntaje" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "mslq_response_id", label: "ID de respuesta MSLQ", type: "number" },
    { name: "mslq_item_id", label: "ID del ítem MSLQ", type: "number" },
    { name: "response_date", label: "Fecha de respuesta", type: "datetime-local" },
    { name: "score", label: "Puntaje", type: "number" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroRespuestasMSLQ() {
    const {
        respuestas,
        createRespuesta,
        updateRespuesta,
        deleteRespuesta,
        loading,
    } = useRespuestasMSLQ();

    return (
        <CrudTable
            title="Respuestas MSLQ"
            data={respuestas}
            columns={columns}
            fields={fields}
            onCreate={createRespuesta}
            onUpdate={updateRespuesta}
            onDelete={deleteRespuesta}
            searchKeys={["item_response_detail_id", "mslq_response_id", "mslq_item_id", "status"]}
            dateFilters={["response_date"]}
        />
    );
}
