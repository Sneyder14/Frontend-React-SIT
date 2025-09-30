import { number } from "framer-motion";
import useTemasTutoria from "../../hooks/useTemasTutoria";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "tutoring_topic_id", label: "ID" },
    { key: "topic", label: "Tema" },
    { key: "description", label: "Descripción" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "tutoring_topic_id", label: "ID", type: "number" },
    { name: "topic", label: "Tema", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroTemasTutoria() {
    const {
        temas,
        createTema,
        updateTema,
        deleteTema,
        loading,
    } = useTemasTutoria();

    return (
        <CrudTable
            title="Temas de Tutoría"
            data={temas}
            columns={columns}
            fields={fields}
            onCreate={createTema}
            onUpdate={updateTema}
            onDelete={deleteTema}
            searchKeys={["tutoring_topic_id", "topic", "status"]}
        />
    );
}
