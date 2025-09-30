import useGruposTutoria from "../../hooks/useGruposTutoria";
import CrudTable from "../crud/CrudTable";

function formatHourTo12(hora) {
    if (!hora) return "";
    const [hour, minute] = hora.slice(0, 5).split(":"); 
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12 + 1);
    return `${hour12}:${minute} ${suffix}`;
}


const columns = [
    { key: "tutoring_group_id", label: "ID" },
    { key: "course_teacher_id", label: "Docente en curso" },
    { key: "tutoring_topic_id", label: "Tema de tutoría" },
    { key: "tutoring_date", label: "Fecha de tutoría" },
    { key: "tutoring_hour", label: "Hora", render: (value) => formatHourTo12(value) },
    { key: "tutoring_site", label: "Lugar" },
    { key: "tutoring_message", label: "Mensaje" },
    { key: "date", label: "Fecha de registro" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "course_teacher_id", label: "ID del docente en curso", type: "number" },
    { name: "tutoring_topic_id", label: "ID del tema de tutoría", type: "number" },
    { name: "tutoring_date", label: "Fecha de tutoría", type: "date" },
    { name: "tutoring_hour", label: "Hora", type: "time" },
    { name: "tutoring_site", label: "Lugar", type: "text" },
    { name: "tutoring_message", label: "Mensaje", type: "textarea" },
    { name: "date", label: "Fecha de registro", type: "date" },
    { name: "status", label: "Estado", type: "text" },
];


export default function RegistroGruposTutoria() {
    const {
        grupos,
        createGrupo,
        updateGrupo,
        deleteGrupo,
        loading,
    } = useGruposTutoria();

    return (
        <CrudTable
            title="Grupos de Tutoría"
            data={grupos}
            columns={columns}
            fields={fields}
            onCreate={createGrupo}
            onUpdate={updateGrupo}
            onDelete={deleteGrupo}
            searchKeys={["tutoring_group_id", "tutoring_site", "status"]}
            dateFilters={["tutoring_date", "date"]}
        />
    );
}
