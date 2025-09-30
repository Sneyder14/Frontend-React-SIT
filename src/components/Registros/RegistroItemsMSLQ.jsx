import useItemsMSLQ from "../../hooks/useItemsMSLQ";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "mslq_item_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "category", label: "Categoría" },
    { key: "item_number", label: "Número de ítem" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "category", label: "Categoría", type: "text" },
    { name: "item_number", label: "Número de ítem", type: "number" },
    { name: "status", label: "Estado", type: "text" },
];

export default function RegistroItemsMSLQ() {
    const {
        items,
        createItem,
        updateItem,
        deleteItem,
        loading,
    } = useItemsMSLQ();

    return (
        <CrudTable
            title="Ítems MSLQ"
            data={items}
            columns={columns}
            fields={fields}
            onCreate={createItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            searchKeys={["mslq_item_id", "name", "category", "status"]}
        />
    );
}
