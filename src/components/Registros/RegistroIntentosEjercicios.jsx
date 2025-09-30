import useIntentosEjercicio from "../../hooks/UseIntentosEjercicios";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "student_exercise_attempt_id", label: "ID" },
    { key: "student_id", label: "Estudiante" },
    { key: "support_exercise_id", label: "Ejercicio" },
    { key: "attempt_date", label: "Fecha de intento" },
    { key: "score", label: "Puntaje" },
    { key: "execution_time_ms", label: "Tiempo (ms)" },
    { key: "feedback", label: "Feedback" },
    { key: "code_submitted", label: "Código enviado" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "student_id", label: "ID del estudiante", type: "number" },
    { name: "support_exercise_id", label: "ID del ejercicio", type: "number" },
    { name: "attempt_date", label: "Fecha de intento", type: "datetime-local" },
    { name: "score", label: "Puntaje", type: "text" },
    { name: "execution_time_ms", label: "Tiempo de ejecución (ms)", type: "number" },
    { name: "feedback", label: "Feedback", type: "textarea" },
    { name: "code_submitted", label: "Código enviado", type: "textarea" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroIntentosEjercicio() {
    const {
        intentos,
        createIntento,
        updateIntento,
        deleteIntento,
        loading,
    } = useIntentosEjercicio();

    return (
        <CrudTable
            title="Intentos de Ejercicio"
            data={intentos}
            columns={columns}
            fields={fields}
            onCreate={createIntento}
            onUpdate={updateIntento}
            onDelete={deleteIntento}
            searchKeys={["student_exercise_attempt_id", "student_id", "score", "status"]}
            dateFilters={["attempt_date"]}
        />
    );
}
