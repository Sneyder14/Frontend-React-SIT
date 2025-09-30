import useTiposCorte from "../../hooks/useTiposCorte";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "cut_type_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "percentage", label: "Porcentaje" },
];

const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "percentage", label: "Porcentaje", type: "text" },
];

export default function RegistroAcademicCutTypes() {
    const {
        tiposCorte,
        createTipoCorte,
        updateTipoCorte,
        deleteTipoCorte,
        loading,
    } = useTiposCorte();

    return (
        <CrudTable
            title="Tipos de Corte"
            data={tiposCorte}
            columns={columns}
            fields={fields}
            onCreate={createTipoCorte}
            onUpdate={updateTipoCorte}
            onDelete={deleteTipoCorte}
            searchKeys={["cut_type_id", "name", "percentage"]}
        />
    );
}
