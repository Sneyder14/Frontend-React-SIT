import useNotasCorte from "../../hooks/useNotasCorte";
import CrudTable from "../crud/CrudTable";

const columns = [
  { key: "student_id", label: "Estudiante" },
  { key: "academic_cut_id", label: "Corte" },
  { key: "delivery_time", label: "Entrega" },
  { key: "grade", label: "Nota" },
  { key: "status", label: "Estado" },
];

const fields = [
  { name: "student_id", label: "ID del estudiante", type: "number" },
  { name: "academic_cut_id", label: "ID del corte", type: "number" },
  { name: "delivery_time", label: "Fecha de entrega", type: "datetime-local" },
  { name: "grade", label: "Nota", type: "number", step: "0.1", min: 0, max: 5 },
  { name: "status", label: "Estado", type: "text" },
];

export default function RegistroCutGrades() {
  const {
    notas,
    createNota,
    updateNota,
    deleteNota,
    loading,
  } = useNotasCorte();

  return (
    <CrudTable
      title="Notas por Corte"
      data={notas}
      columns={columns}
      fields={fields}
      onCreate={createNota}
      onUpdate={updateNota}
      onDelete={deleteNota}
      searchKeys={["academic_cut_grade_id", "student_id", "grade", "status"]}
      dateFilters={["delivery_time"]}
    />
  );
}
