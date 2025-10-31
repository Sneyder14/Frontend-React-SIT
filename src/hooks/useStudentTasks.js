import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useStudentTasks() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const studentId = user?.id_user;

  useEffect(() => {
    if (!studentId) return;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchTareas = async () => {
      try {
      
        const resAsignadas = await axios.get("http://72.61.0.205:8000/api/academics/students-tasks/", { headers });
        const asignadas = Array.isArray(resAsignadas.data) ? resAsignadas.data : [];
        const tareasDelEstudiante = asignadas.filter(t => t.students_student_id === studentId);

        
        const resTareas = await axios.get("http://72.61.0.205:8000/api/academics/tasks/", { headers });
        const tareasAcademicas = Array.isArray(resTareas.data) ? resTareas.data : [];

        
        const tareasEnriquecidas = tareasDelEstudiante.map((t, index) => {
          const detalle = tareasAcademicas.find(td => td.task_id === t.task_task_id);

          return {
            id: t.students_task_id || `tarea-${index}`,
            name: detalle?.name || `Tarea ${t.task_task_id}`,
            description: detalle?.description || "Sin descripción",
            end_date: detalle?.end_date || "2025-09-01",
            status: detalle?.status || "pendiente",
            percentage: detalle?.grade ? `${Math.round((parseFloat(t.grade) / 5) * 100)}%` : "0%",
          };
        });

        setTareas(tareasEnriquecidas);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar tareas enriquecidas:", err);
        setError("No se pudieron cargar las tareas.");
        setLoading(false);
      }
    };

    fetchTareas();
  }, [studentId]);

  return { tareas, loading, error };
}
