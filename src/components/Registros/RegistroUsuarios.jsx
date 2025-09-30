import adminStudent from "../../hooks/adminStudent";
import CrudTable from "../crud/CrudTable";

const columns = [
    { key: "id_user", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "last_name", label: "Apellido" },
    { key: "email", label: "Correo" },
    { key: "status", label: "Estado" },
];

const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "last_name", label: "Apellido", type: "text" },
    { name: "email", label: "Correo", type: "email" },
    { name: "status", label: "Estado", type: "select", options: ["A", "I"] },
];

export default function RegistroEstudiantes() {
    const {
        students,
        createStudent,
        updateStudent,
        deleteStudent,
        loading,
        error,
    } = adminStudent();

    return (
        <CrudTable
            data={students}
            columns={columns}
            fields={fields}
            onCreate={createStudent}
            onUpdate={updateStudent}
            onDelete={deleteStudent}
            searchKeys={["id_user", "name", "email"]}
        />
    );
}
