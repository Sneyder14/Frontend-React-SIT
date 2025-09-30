import useCursoDocentes from "../../hooks/useCursoDocentes";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "course_teacher_id", label: "ID" },
    { key: "course_id", label: "Curso" },
    { key: "teacher_id", label: "Docente" },
    { key: "assignment_date", label: "Fecha de asignación" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "course_id", label: "ID del curso", type: "number" },
    { name: "teacher_id", label: "ID del docente", type: "number" },
    { name: "assignment_date", label: "Fecha de asignación", type: "datetime-local" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroCourseTeachers() {
    const {
        cursoDocentes,
        createCursoDocente,
        updateCursoDocente,
        deleteCursoDocente,
        loading,
    } = useCursoDocentes();

    return (
        <CrudTable
            title="Docentes por Curso"
            data={cursoDocentes}
            columns={columns}
            fields={fields}
            onCreate={createCursoDocente}
            onUpdate={updateCursoDocente}
            onDelete={deleteCursoDocente}
            searchKeys={["course_teacher_id", "course_id", "teacher_id", "status"]}
            dateFilters={["assignment_date"]}
        />
    );
}
