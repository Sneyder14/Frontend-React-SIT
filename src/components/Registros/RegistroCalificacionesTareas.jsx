import useCalificacionesTareas from "../../hooks/useCalificacionesTareas";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "task_grade_id", label: "ID" },
    { key: "students_task_id", label: "Tarea del estudiante" },
    { key: "delivery_time", label: "Fecha de entrega" },
    { key: "results", label: "Resultados" },
    { key: "grade", label: "Nota" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "students_task_id", label: "ID de la tarea del estudiante", type: "number" },
    { name: "delivery_time", label: "Fecha de entrega", type: "datetime-local" },
    { name: "results", label: "Resultados", type: "textarea" },
    { name: "grade", label: "Nota", type: "text" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroCalificacionesTareas() {
    const {
        calificaciones,
        createCalificacion,
        updateCalificacion,
        deleteCalificacion,
        loading,
    } = useCalificacionesTareas();

    return (
        <CrudTable
            title="Calificaciones de Tareas"
            data={calificaciones}
            columns={columns}
            fields={fields}
            onCreate={createCalificacion}
            onUpdate={updateCalificacion}
            onDelete={deleteCalificacion}
            searchKeys={["task_grade_id", "grade", "status"]}
            dateFilters={["delivery_time"]}
        />
    );
}
