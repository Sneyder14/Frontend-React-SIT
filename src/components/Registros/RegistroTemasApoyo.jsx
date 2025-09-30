import useTemasApoyo from "../../hooks/useTemasApoyo";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "support_topic_id", label: "ID" },
    { key: "academic_cut_id", label: "Corte Académico" },
    { key: "topic", label: "Tema" },
    { key: "description", label: "Descripción" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "academic_cut_id", label: "ID del corte académico", type: "number" },
    { name: "topic", label: "Tema", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroTemasApoyo() {
    const {
        temas,
        createTema,
        updateTema,
        deleteTema,
        loading,
    } = useTemasApoyo();

    return (
        <CrudTable
            title="Temas de Apoyo"
            data={temas}
            columns={columns}
            fields={fields}
            onCreate={createTema}
            onUpdate={updateTema}
            onDelete={deleteTema}
            searchKeys={["support_topic_id", "topic", "status"]}
            dateFilters={[]}
        />
    );
}
