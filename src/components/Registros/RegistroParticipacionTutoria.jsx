import useParticipacionTutoria from "../../hooks/useParticipacionTutoria";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "tutoring_participation_id", label: "ID" },
    { key: "tutoring_group_id", label: "Grupo de tutoría" },
    { key: "course_student_id", label: "Estudiante en curso" },
    { key: "enrollment_date", label: "Fecha de inscripción" },
    { key: "participation_status", label: "Estado de participación" },
];

const fields = [
    { name: "tutoring_group_id", label: "ID del grupo de tutoría", type: "number" },
    { name: "course_student_id", label: "ID del estudiante en curso", type: "number" },
    { name: "enrollment_date", label: "Fecha de inscripción", type: "datetime-local" },
    { name: "participation_status", label: "Estado de participación", type: "text" },
];

export default function RegistroParticipacionTutoria() {
    const {
        participaciones,
        createParticipacion,
        updateParticipacion,
        deleteParticipacion,
        loading,
    } = useParticipacionTutoria();

    return (
        <CrudTable
            title="Participación en Tutoría"
            data={participaciones}
            columns={columns}
            fields={fields}
            onCreate={createParticipacion}
            onUpdate={updateParticipacion}
            onDelete={deleteParticipacion}
            searchKeys={["tutoring_participation_id", "course_student_id", "participation_status"]}
            dateFilters={["enrollment_date"]}
        />
    );
}
