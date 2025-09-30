import useSemestres from "../../hooks/useSemestres";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "semester_id", label: "ID" },
    { key: "semester_level", label: "Nivel" },
];

const fields = [
    { name: "semester_level", label: "Nivel del semestre", type: "text" },
];

export default function RegistroSemestres() {
    const {
        semestres,
        createSemestre,
        updateSemestre,
        deleteSemestre,
        loading,
    } = useSemestres();

    return (
        <CrudTable
            title="Semestres"
            data={semestres}
            columns={columns}
            fields={fields}
            onCreate={createSemestre}
            onUpdate={updateSemestre}
            onDelete={deleteSemestre}
            searchKeys={["semester_id", "semester_level"]}
        />
    );
}
