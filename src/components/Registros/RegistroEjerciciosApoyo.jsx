import useEjerciciosApoyo from "../../hooks/useEjerciciosApoyo";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "support_exercise_id", label: "ID" },
    { key: "assignment_id", label: "Asignación" },
    { key: "title", label: "Título" },
    { key: "statement", label: "Enunciado" },
    { key: "difficulty_level", label: "Dificultad" },
    { key: "number_of_tries", label: "Intentos" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "assignment_id", label: "ID de asignación", type: "number" },
    { name: "title", label: "Título", type: "text" },
    { name: "statement", label: "Enunciado", type: "textarea" },
    { name: "difficulty_level", label: "Nivel de dificultad", type: "number" },
    { name: "number_of_tries", label: "Número de intentos", type: "number" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroEjerciciosApoyo() {
    const {
        ejercicios,
        createEjercicio,
        updateEjercicio,
        deleteEjercicio,
        loading,
    } = useEjerciciosApoyo();

    return (
        <CrudTable
            title="Ejercicios de Apoyo"
            data={ejercicios}
            columns={columns}
            fields={fields}
            onCreate={createEjercicio}
            onUpdate={updateEjercicio}
            onDelete={deleteEjercicio}
            searchKeys={["support_exercise_id", "title", "status"]}
        />
    );
}
