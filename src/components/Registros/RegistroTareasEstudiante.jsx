import useTareasEstudiante from "../../hooks/useTareasEstudiante";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "students_task_id", label: "ID" },
    { key: "students_student_id", label: "Estudiante" },
    { key: "task_task_id", label: "Tarea" },
];

const fields = [
    { name: "students_student_id", label: "ID del estudiante", type: "number" },
    { name: "task_task_id", label: "ID de la tarea", type: "number" },
];

export default function RegistroTareasEstudiante() {
    const {
        tareas,
        createTarea,
        updateTarea,
        deleteTarea,
        loading,
    } = useTareasEstudiante();

    return (
        <CrudTable
            title="Tareas Estudiante"
            data={tareas}
            columns={columns}
            fields={fields}
            onCreate={createTarea}
            onUpdate={updateTarea}
            onDelete={deleteTarea}
            searchKeys={["students_task_id", "students_student_id", "task_task_id"]}
        />
    );
}
