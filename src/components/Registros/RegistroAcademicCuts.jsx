import useCortes from "../../hooks/useCortes";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "academic_cut_id", label: "ID" },
    { key: "semester_id", label: "Semestre" },
    { key: "start_date", label: "Inicio" },
    { key: "end_date", label: "Fin" },
    { key: "status", label: "Estado" },
    { key: "cut_type_id", label: "Tipo de corte" },
];

const fields = [
    { name: "semester_id", label: "ID del semestre", type: "number" },
    { name: "start_date", label: "Fecha de inicio", type: "date" },
    { name: "end_date", label: "Fecha de fin", type: "date" },
    { name: "status", label: "Estado", type: "text" },
    { name: "cut_type_id", label: "ID del tipo de corte", type: "number" },
];

export default function RegistroAcademicCuts() {
    const {
        cortes,
        createCorte,
        updateCorte,
        deleteCorte,
        loading,
    } = useCortes();

    return (
        <CrudTable
            title="Cortes Académicos"
            data={cortes}
            columns={columns}
            fields={fields}
            onCreate={createCorte}
            onUpdate={updateCorte}
            onDelete={deleteCorte}
            searchKeys={["academic_cut_id", "semester_id", "status"]}
        />
    );
}
