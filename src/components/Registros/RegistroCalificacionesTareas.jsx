import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useCalificacionesTareas from "../../hooks/useCalificacionesTareas";

export default function RegistroCalificacionesTareas() {
  const [usuarios, setUsuarios] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [tareasBase, setTareasBase] = useState([]);
  const [tareasEstudiante, setTareasEstudiante] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [error, setError] = useState(null);

  const {
    calificaciones,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion,
    loading,
  } = useCalificacionesTareas();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchExtras = async () => {
      try {
        const [userRes, studentRes, taskRes, studentTaskRes] = await Promise.all([
          axios.get("http://72.61.0.205:8000/api/auth/users/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/students/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/tasks/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/students-tasks/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsuarios(userRes.data);
        setEstudiantes(studentRes.data);
        setTareasBase(taskRes.data);
        setTareasEstudiante(studentTaskRes.data);
        setLoadingLocal(false);
      } catch (err) {
        setError("Error al cargar usuarios, estudiantes o tareas");
        setLoadingLocal(false);
      }
    };

    fetchExtras();
  }, []);

  const enriched = useMemo(() => {
    return calificaciones.map((r) => {
      const tareaEstudiante = tareasEstudiante.find(t => t.students_task_id === r.students_task_id);
      const usuario = tareaEstudiante
        ? usuarios.find(u => u.id_user === tareaEstudiante.students_student_id && u.id_role === 1)
        : null;
      const tarea = tareaEstudiante
        ? tareasBase.find(t => t.task_id === tareaEstudiante.task_task_id)
        : null;

      return {
        ...r,
        nombre_estudiante: usuario
          ? `${usuario.name} ${usuario.last_name}`
          : `ID ${tareaEstudiante?.students_student_id ?? "?"}`,
        nombre_tarea: tarea?.name ?? `ID ${tareaEstudiante?.task_task_id ?? "?"}`,
      };
    });
  }, [calificaciones, tareasEstudiante, usuarios, tareasBase]);

  const columns = [
    { key: "task_grade_id", label: "ID" },
    { key: "nombre_estudiante", label: "Estudiante" },
    { key: "nombre_tarea", label: "Tarea" },
    { key: "delivery_time", label: "Fecha de entrega" },
    { key: "results", label: "Resultados" },
    { key: "grade", label: "Nota" },
    { key: "status", label: "Estado" },
  ];

  const fields = [
    { name: "students_task_id", label: "ID de la tarea del estudiante", type: "number" },
    { name: "delivery_time", label: "Fecha de entrega", type: "datetime-local" },
    { name: "results", label: "Resultados", type: "textarea" },
    { name: "grade", label: "Nota", type: "text" },
    { name: "status", label: "Estado", type: "text" },
  ];

  return (
    <CrudTable
      title="Calificaciones de Tareas"
      data={enriched}
      columns={columns}
      fields={fields}
      onCreate={createCalificacion}
      onUpdate={updateCalificacion}
      onDelete={deleteCalificacion}
      loading={loading || loadingLocal}
      error={error}
      searchKeys={["task_grade_id", "nombre_estudiante", "nombre_tarea", "grade", "status"]}
      dateFilters={["delivery_time"]}
    />
  );
}
