import useCursos from "../../hooks/useCursos";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "course_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "acronym", label: "Acrónimo" },
    { key: "description", label: "Descripción" },
    { key: "credits", label: "Créditos" },
    { key: "semester_id", label: "Semestre" },
];

const fields = [
    { name: "name", label: "Nombre del curso", type: "text" },
    { name: "acronym", label: "Acrónimo", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "credits", label: "Créditos", type: "number" },
    { name: "semester_id", label: "ID del semestre", type: "number" },
];

export default function RegistroCursos() {
    const {
        cursos,
        createCurso,
        updateCurso,
        deleteCurso,
        loading,
    } = useCursos();

    return (
        <CrudTable
            title="Cursos"
            data={cursos}
            columns={columns}
            fields={fields}
            onCreate={createCurso}
            onUpdate={updateCurso}
            onDelete={deleteCurso}
            searchKeys={["course_id", "name", "acronym"]}
        />
    );
}
