import useEstudiantes from "../../hooks/useEstudiantes";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "student_id", label: "ID" },
    { key: "student_code", label: "Código" },
];

const fields = [
    {name:"student_id", label: "ID", type: "number"},
    { name: "student_code", label: "Código del estudiante", type: "text" },
];

export default function RegistroEstudiantes() {
    const {
        estudiantes,
        createEstudiante,
        updateEstudiante,
        deleteEstudiante,
        loading,
    } = useEstudiantes();

    return (
        <CrudTable
            title="Estudiantes"
            data={estudiantes}
            columns={columns}
            fields={fields}
            onCreate={createEstudiante}
            onUpdate={updateEstudiante}
            onDelete={deleteEstudiante}
            searchKeys={["student_id", "student_code"]}
        />
    );
}
