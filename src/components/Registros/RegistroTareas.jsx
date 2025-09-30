import useTareas from "../../hooks/useTareas";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "task_id", label: "ID" },
    { key: "course_teacher_id", label: "Docente en curso" },
    { key: "academic_cut_id", label: "Corte académico" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "start_date", label: "Inicio" },
    { key: "end_date", label: "Fin" },
    { key: "status", label: "Estado" },
    { key: "percentage", label: "Porcentaje" },
];

const fields = [
    { name: "course_teacher_id", label: "ID del docente en curso", type: "number" },
    { name: "academic_cut_id", label: "ID del corte académico", type: "number" },
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "start_date", label: "Fecha de inicio", type: "datetime-local" },
    { name: "end_date", label: "Fecha de fin", type: "datetime-local" },
    { name: "status", label: "Estado", type: "text" },
    { name: "percentage", label: "Porcentaje", type: "text" },
];

export default function RegistroTareas() {
    const {
        tareas,
        createTarea,
        updateTarea,
        deleteTarea,
        loading,
    } = useTareas();

    return (
        <CrudTable
            title="Tareas Académicas"
            data={tareas}
            columns={columns}
            fields={fields}
            onCreate={createTarea}
            onUpdate={updateTarea}
            onDelete={deleteTarea}
            searchKeys={["task_id", "name", "status"]}
            dateFilters={["start_date", "end_date"]}
        />
    );
}
