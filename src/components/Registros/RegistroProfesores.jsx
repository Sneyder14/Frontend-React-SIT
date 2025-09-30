import useProfesores from "../../hooks/useProfesores";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "teacher_id", label: "ID" },
    { key: "speciality", label: "Especialidad" },
];

const fields = [
    {
        name: "teacher_id",
        label: "ID del docente",
        type: "number",
    },
    {
        name: "speciality",
        label: "Especialidad",
        type: "text",
    },
];


export default function RegistroProfesores() {
    const {
        profesores,
        createProfesor,
        updateProfesor,
        deleteProfesor,
        loading,
    } = useProfesores();

    return (
        <CrudTable
            title="Profesores"
            data={profesores}
            columns={columns}
            fields={fields}
            onCreate={createProfesor}
            onUpdate={updateProfesor}
            onDelete={deleteProfesor}
            searchKeys={["teacher_id", "speciality"]}
        />
    );
}
