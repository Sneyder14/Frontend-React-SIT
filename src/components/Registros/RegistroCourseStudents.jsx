import useCursoEstudiantes from "../../hooks/useCursosEstudiantes";
import CrudTable from "../crud/CrudTable";

const columns = [
  { key: "course_student_id", label: "ID" },
  { key: "course_id", label: "Curso" },
  { key: "student_id", label: "Estudiante" },
  { key: "enrollment_date", label: "Fecha de inscripción" },
  { key: "final_grade", label: "Nota final" },
  { key: "status", label: "Estado" },
];

const fields = [
  
  { name: "course_id", label: "ID del curso", type: "number" },
  { name: "student_id", label: "ID del estudiante", type: "number" },
  { name: "enrollment_date", label: "Fecha de inscripción", type: "datetime-local" },
  { name: "final_grade", label: "Nota final", type: "text" },
  { name: "status", label: "Estado", type: "text" },
];

export default function RegistroCourseStudents() {
  const {
    cursoEstudiantes,
    createCursoEstudiante,
    updateCursoEstudiante,
    deleteCursoEstudiante,
    loading,
  } = useCursoEstudiantes();

  return (
    <CrudTable
      title="Estudiantes por Curso"
      data={cursoEstudiantes}
      columns={columns}
      fields={fields}
      onCreate={createCursoEstudiante}
      onUpdate={updateCursoEstudiante}
      onDelete={deleteCursoEstudiante}
      searchKeys={["course_student_id", "course_id", "student_id", "status"]}
      dateFilters={["enrollment_date"]}
    />
  );
}
