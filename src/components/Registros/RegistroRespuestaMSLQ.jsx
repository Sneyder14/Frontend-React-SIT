import useRespuestasMSLQ from "../../hooks/useRespuestaMSLQ";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "mslq_response_id", label: "ID" },
    { key: "course_student_id", label: "Estudiante en curso" },
    { key: "total_score", label: "Puntaje total" },
    { key: "response_date", label: "Fecha de respuesta" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "course_student_id", label: "ID del estudiante en curso", type: "number" },
    { name: "total_score", label: "Puntaje total", type: "text" },
    { name: "response_date", label: "Fecha de respuesta", type: "datetime-local" },
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
            searchKeys={["mslq_response_id", "course_student_id", "status"]}
            dateFilters={["response_date"]}
        />
    );
}
